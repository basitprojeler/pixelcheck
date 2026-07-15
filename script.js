// Durum Değişkenleri
let currentTestMode = '';
let colorIndex = 0;

// Ölü piksel testindeki renk döngüsü (Beyaz, Siyah, Kırmızı, Yeşil, Mavi)
const pixelColors = ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff'];

const testCanvas = document.getElementById('test-canvas');
const mainMenu = document.getElementById('main-menu');
const testGui = document.getElementById('test-gui');
const ghostingArea = document.getElementById('ghosting-area');

// Testi Başlatma Fonksiyonu
function startTest(type) {
    currentTestMode = type;
    colorIndex = 0;

    // Tarayıcıyı Tam Ekran Yapma (Farklı tarayıcı motorları uyumluluğu için)
    const docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) { /* Firefox */
        docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) { /* Chrome, Safari & Opera */
        docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) { /* IE/Edge */
        docElm.msRequestFullscreen();
    }

    // Arayüz Geçişleri
    testCanvas.style.display = 'block';
    mainMenu.style.display = 'none';

    if (type === 'pixel') {
        testGui.style.display = 'block';
        testGui.innerText = "Ölü Piksel Testi. Geçmek için TIKLAYIN. Çıkmak için ESC.";
        ghostingArea.style.display = 'none';
        applyColor(pixelColors[0]);
        
        // 3 saniye sonra kılavuz yazıyı gizle
        setTimeout(() => { testGui.style.opacity = '0'; }, 3000);

    } else if (type === 'leakage') {
        testGui.style.display = 'block';
        testGui.innerText = "Işık Sızması Testi (Tam Siyah). Çıkmak için ESC.";
        ghostingArea.style.display = 'none';
        applyColor('#000000');
        
        setTimeout(() => { testGui.style.opacity = '0'; }, 3000);

    } else if (type === 'ghosting') {
        testGui.style.display = 'block';
        testGui.innerText = "Ghosting Testi. Çıkmak için ESC.";
        testCanvas.style.backgroundColor = '#1a1a1a';
        ghostingArea.style.display = 'block';

        setTimeout(() => { testGui.style.opacity = '0'; }, 3000);
    }
}

// Seçilen rengi tam ekrana uygula
function applyColor(color) {
    testCanvas.style.backgroundColor = color;
}

// Test Sırasındaki Sol Tık Algılayıcı (Renkleri değiştirir)
testCanvas.addEventListener('click', () => {
    testGui.style.opacity = '1'; // Kılavuzu tekrar göster
    
    if (currentTestMode === 'pixel') {
        colorIndex++;
        if (colorIndex < pixelColors.length) {
            applyColor(pixelColors[colorIndex]);
        } else {
            exitFullscreen(); // Tüm renkler bittiyse tam ekrandan çık
        }
    }
});

// Sağ Tık ile Hızlı Çıkış
testCanvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    exitFullscreen();
});

// Klavyeden ESC ile çıkıldığında tetiklenen sıfırlama dinleyicisi
function onFullscreenChange() {
    if (!document.fullscreenElement && 
        !document.webkitIsFullScreen && 
        !document.mozFullScreen && 
        !document.msFullscreenElement) {
        
        // Test alanını gizle, ana menüyü geri getir
        testCanvas.style.display = 'none';
        mainMenu.style.display = 'block';
        testGui.style.opacity = '1';
        ghostingArea.style.display = 'none';
    }
}

document.addEventListener('fullscreenchange', onFullscreenChange);
document.addEventListener('webkitfullscreenchange', onFullscreenChange);
document.addEventListener('mozfullscreenchange', onFullscreenChange);
document.addEventListener('MSFullscreenChange', onFullscreenChange);

// Tam Ekrandan Manuel Çıkış Fonksiyonu
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}