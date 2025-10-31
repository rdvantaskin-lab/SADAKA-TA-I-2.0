document.addEventListener('DOMContentLoaded', () => {
    // Gerekli HTML elementlerini seçiyoruz
    const amountInput = document.getElementById('amountInput');
    const donateButton = document.getElementById('donateButton');
    const totalDonationDisplay = document.getElementById('totalDonation');
    const needsMetDisplay = document.getElementById('needsMet');
    const presetButtons = document.querySelectorAll('.preset-btn');

    // Sayfa ilk yüklendiğinde paneli bu değerlerle güncelliyoruz
    updateDisplay();

    // Hazır miktar butonlarına tıklama olayını ekliyoruz
    presetButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Butonun 'data-amount' özelliğindeki değeri alıp input'a yazıyoruz
            const amount = button.getAttribute('data-amount');
            amountInput.value = amount;
        });
    });

    // "Güvenle Bağış Yap" butonuna tıklama olayını ekliyoruz
    donateButton.addEventListener('click', () => {
        // Input'taki değeri sayıya çeviriyoruz. Eğer boşsa 0 kabul ediyoruz.
        const donationAmount = parseFloat(amountInput.value);

        // Geçerli bir sayı girilmiş mi ve 0'dan büyük mü diye kontrol ediyoruz
        if (!isNaN(donationAmount) && donationAmount > 0) {
            
            // Toplam bağış miktarını güncelliyoruz
            currentTotalDonation += donationAmount;
            
            // İşlem sayısını (karşılanan ihtiyaç) bir artırıyoruz
            currentNeedsMet++;
            
            // Ekrandaki paneli yeni değerlerle güncelliyoruz
            updateDisplay();
            
            // İşlem sonrası input alanını temizliyoruz
            amountInput.value = '';
            
            // Kullanıcıya geri bildirim (isteğe bağlı)
            alert(`${donationAmount.toLocaleString('tr-TR')} ₺ tutarındaki bağışınızla bir ihtiyacın karşılanmasına destek oldunuz! Teşekkür ederiz.`);
        } else {
            // Geçersiz bir miktar girildiyse kullanıcıyı uyarıyoruz
            alert('Lütfen geçerli bir bağış miktarı giriniz.');
        }
    });

    // Şeffaflık panelini güncelleyen fonksiyon
    function updateDisplay() {
        // Toplam bağış miktarını Türkiye formatında (noktalı) yazdırıyoruz
        totalDonationDisplay.textContent = `${currentTotalDonation.toLocaleString('tr-TR', { minimumFractionDigits: 0 })} ₺`;
        
        // Karşılanan ihtiyaç sayısını yazdırıyoruz
        needsMetDisplay.textContent = currentNeedsMet.toString();
    }
});