const apiUrl = "http://localhost:5113/api/Notlar";

const divNotlar = document.querySelector('#notlar');
const frmNot = document.querySelector('#frmNot');
const txtBaslik = document.querySelector('#baslik');
const txtIcerik = document.querySelector('#icerik');
const btnYeni = document.querySelector('#yeni');
const btnSil = document.querySelector('#sil');
let notlar = [];

let seciliNot = null;

function notlariGetir() {

    axios.get(apiUrl).then(res => {
        notlar = res.data;
        notlariListele()
    });

}
function notlariListele(){
    divNotlar.innerHTML = "";

    for (const not of notlar) {
        let a = document.createElement('a');
        a.not = not;
        a.className = 'list-group-item list-group-item-action';
        a.href = '#';
        a.textContent = not.baslik;
        a.onclick = (e) => {
            notuGoster(not);
        }
        divNotlar.append(a);
    }
}

function notuGoster(not) {
    seciliNot = not;
    frmNot.className = '';
    txtBaslik.value = not.baslik;
    txtIcerik.value = not.icerik;
    secimiGuncelle();
}



function secimiGuncelle() {
    divNotlar.childNodes.forEach(el => {
        if (el.not.id == seciliNot?.id) {
            el.classList.add("active");
        }
        else {
            el.classList.remove("active");
        }
    })
}
yeni.onclick = () => {

    let yeniNot = {
        baslik: 'Yeni Not',
        icerik: '',
    };
    axios.post(apiUrl, yeniNot)
        .then(res => {
            seciliNot = res.data;
            notlar.push(seciliNot);
            notlariListele();
            notuGoster(res.data)
        });

}

frmNot.onsubmit=(e)=>{
    e.preventDefault();

    let not={
        id:seciliNot.id,
        baslik:txtBaslik.value,
        icerik:txtIcerik.value
    }

    axios.put(apiUrl+'/'+seciliNot.id,not)
    .then(res=>{
        seciliNot.baslik=not.baslik;
        seciliNot.icerik=not.icerik;
        notlariListele();
        notuGoster(seciliNot);
    });

}
btnSil.onclick=()=>{

    axios.delete(apiUrl+'/'+seciliNot.id)
    .then(res=>{
        let sid=notlar.indexOf(seciliNot);
        notlar.splice(sid,1);
        notlariListele();
        frmNot.className='d-none';
        if(notlar.length){
            notuGoster(notlar[Math.min(sid,notlar.length-1)]);
    }});

}

notlariGetir();