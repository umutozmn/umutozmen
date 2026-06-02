// Sayfa ilk açıldığında hafızada sepet var mı diye bak, yoksa boş bir liste (dizi) oluştur
let sepet = [];
if (localStorage.getItem("sepet_verisi")) {
    sepet = JSON.parse(localStorage.getItem("sepet_verisi"));
}

// 1. ÜRÜNLER SAYFASI: Sepete yeni ürün ekleme fonksiyonu
function sepeteEkle(urunAdi, urunFiyati) {
    alert("Sepete eklendi");

    // Yeni ürünü basit bir obje olarak oluşturuyoruz
    let yeniUrun = {
        ad: urunAdi,
        fiyat: urunFiyati
    };

    // Ürünü listemize (dizimize) ekliyoruz
    sepet.push(yeniUrun);

    // Listeyi tarayıcı hafızasına kaydediyoruz
    localStorage.setItem("sepet_verisi", JSON.stringify(sepet));
}

// 2. SEPET SAYFASI: Sayfa açıldığında ürünleri listeleme kontrolü
const listeDiv = document.getElementById("sepet-listesi");
const toplamSpan = document.getElementById("toplam-fiyat");

if (listeDiv) {
    let toplamTutar = 0;

    // Eğer sepette ürün varsa içini temizle ve döngüyle ürünleri bas
    if (sepet.length > 0) {
        listeDiv.innerHTML = ""; // Sayfadaki "Sepetiniz Boş" yazısını temizle

        // Klasik ve en basit FOR döngüsü ile ürünleri alt alta yazdırıyoruz
        for (let i = 0; i < sepet.length; i++) {
            toplamTutar = toplamTutar + sepet[i].fiyat;

            // Orijinal CSS'indeki .sepet-eleman yapısını kullanıyoruz
            listeDiv.innerHTML += `
                <div class="sepet-eleman">
                    <span><strong>${sepet[i].ad}</strong></span>
                    <span class="fiyat">${sepet[i].fiyat} TL</span>
                    <a href="#" class="buton" onclick="tekUrunSil(${i})" style="background-color: #c0392b;">Kaldır</a>
                </div>
            `;
        }
    }
    // Toplam fiyatı ekrana yazdır
    toplamSpan.innerText = toplamTutar;
}

// 3. TEK ÜRÜN SİLME FONKSİYONU
function tekUrunSil(index) {
    // Tıklanan ürünü diziden çıkartır (en temel dizi metodudur)
    sepet.splice(index, 1);
    // Güncel sepeti hafızaya kaydet
    localStorage.setItem("sepet_verisi", JSON.stringify(sepet));
    // Sayfayı yenileyerek listeyi güncelle
    window.location.reload();
}

// 4. SATIN AL FONKSİYONU
function satinAl() {
    if (sepet.length === 0) {
        alert("Sepetiniz boş!");
    } else {
        alert("Satın alındı");
        localStorage.clear(); // Hafızayı temizle
        window.location.reload(); // Sayfayı yenile
    }
}


