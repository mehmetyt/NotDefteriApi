const apiUrl = "http://localhost:5113/api/Notlar";

const divNotlar = document.querySelector('#notlar');
const frmNot = document.querySelector('#frmNot');
const txtBaslik = document.querySelector('#baslik');
const txtIcerik = document.querySelector('#icerik');
const btnYeni = document.querySelector('#yeni');
const btnSil = document.querySelector('#sil');
let notlar = [];

let seciliNot = null;

function listele() {
    divNotlar.innerHTML = "";

    axios.get(apiUrl).then(res => {
        // console.log(res.data);
        notlar = res.data;

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
        if (seciliNot != null) {
            notuGoster(notlar.find(x=>x.id==seciliNot.id));
        }
        else{
            frmNot.className='d-none';
        }
    });

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
            listele();
        });

}

frmNot.onsubmit=(e)=>{
    e.preventDefault();

    let yeniNot={
        id:seciliNot.id,
        baslik:txtBaslik.value,
        icerik:txtIcerik.value
    }

    axios.put(apiUrl+'/'+seciliNot.id,yeniNot)
    .then(res=>{
        listele();
    })

}
btnSil.onclick=(e)=>{
    e.preventDefault();

    axios.delete(apiUrl+'/'+seciliNot.id)
    .then(res=>{
        seciliNot=null;
        listele();
    });

}

listele();