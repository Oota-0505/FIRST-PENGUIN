document.addEventListener('DOMContentLoaded', function() {

    // --- 追従型CTAボタンの表示/非表示制御 ---
    const floatingCta = document.querySelector('.floating-cta');
    if (floatingCta) {
        // ヒーローセクションの高さを取得
        const heroSectionHeight = document.querySelector('#hero').offsetHeight;

        window.addEventListener('scroll', function() {
            // ヒーローセクションの高さ分スクロールしたらボタンを表示
            if (window.scrollY > heroSectionHeight) {
                floatingCta.classList.add('is-visible');
            } else {
                floatingCta.classList.remove('is-visible');
            }
        });
    }

    // --- スムーススクロール ---
    // スムーススクロールを適用したい全てのリンクを取得
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- ボタンのダミー動作 ---
    // href="#" が設定されているが、スムーススクロールではないリンクのクリックをハンドル
    const dummyLinks = document.querySelectorAll('a[href="#"]:not(.smooth-scroll)');
    dummyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // お問い合わせボタンなど、特定のボタンはアラート内容を変更
            if (this.classList.contains('cta-button')) {
                alert('お問い合わせフォームへ移動します（準備中）');
            } else {
                alert('現在この機能は準備中です。');
            }
        });
    });

    // --- レスポンシブテーブルのデータ属性設定 ---
    // 小さな画面でテーブルがカード形式になった際に、ヘッダー情報を表示するため
    const table = document.querySelector('.comparison-table');
    if (table) {
        const headers = [];
        table.querySelectorAll('th').forEach(header => {
            headers.push(header.textContent);
        });

        table.querySelectorAll('tbody tr').forEach(row => {
            row.querySelectorAll('td').forEach((cell, index) => {
                cell.setAttribute('data-label', headers[index]);
            });
        });
    }

    // --- 背景ボックスアニメーション ---
    function createBackgroundBoxes() {
        const boxesContainer = document.querySelector('.boxes-container');
        if (!boxesContainer) return;

        const colors = [
            'rgb(125, 211, 252)', // sky-300
            'rgb(249, 168, 212)', // pink-300  
            'rgb(134, 239, 172)', // green-300
            'rgb(253, 224, 71)',  // yellow-300
            'rgb(252, 165, 165)', // red-300
            'rgb(216, 180, 254)', // purple-300
            'rgb(147, 197, 253)', // blue-300
            'rgb(165, 180, 252)', // indigo-300
            'rgb(196, 181, 253)', // violet-300
        ];

        const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

        // グリッドボックスを作成（軽量化のため数を調整）
        const rows = 80;
        const cols = 60;
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const box = document.createElement('div');
                box.className = 'grid-box';
                box.style.gridColumn = j + 1;
                box.style.gridRow = i + 1;
                
                // ランダムなタイミングでホバー効果をトリガー
                if (Math.random() < 0.1) {
                    setTimeout(() => {
                        box.style.backgroundColor = getRandomColor();
                        setTimeout(() => {
                            box.style.backgroundColor = 'transparent';
                        }, 2000);
                    }, Math.random() * 5000);
                }
                
                box.addEventListener('mouseenter', () => {
                    box.style.backgroundColor = getRandomColor();
                    box.style.transition = 'background-color 0s';
                });
                
                box.addEventListener('mouseleave', () => {
                    box.style.transition = 'background-color 2s ease';
                    box.style.backgroundColor = 'transparent';
                });
                
                boxesContainer.appendChild(box);
            }
        }
    }

    // ボックスアニメーションを初期化
    createBackgroundBoxes();

    // --- パララックス効果 ---
    function initParallax() {
        const heroBackground = document.querySelector('.hero-background');
        const heroSection = document.querySelector('.hero-section');
        
        if (!heroBackground || !heroSection) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            const scrollProgress = Math.min(scrolled / heroHeight, 1);
            
            // 背景画像のパララックス効果
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px) translateZ(0)`;
            
            // 装飾要素のパララックス効果
            const heroDecorations = document.querySelector('.hero-section::before');
            if (heroDecorations) {
                heroBackground.style.setProperty('--parallax-offset', `${scrolled * 0.3}px`);
            }
        });
    }

    // パララックス効果を初期化
    initParallax();

    // --- カスタムカーソル ---
    function initCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        const cursorText = document.querySelector('.cursor-text');
        
        if (!cursor || !cursorText) return;

        // 文字を円形に配置
        const spans = cursorText.querySelectorAll('span');
        const totalChars = spans.length;
        
        spans.forEach((span, index) => {
            const angle = (index / totalChars) * 360;
            span.style.transform = `rotate(${angle}deg)`;
        });

        // マウス追従
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let isMoving = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMoving = true;
        });

        function updateCursor() {
            // より早い追従効果（イージング係数を調整）
            const easing = isMoving ? 0.25 : 0.15;
            cursorX += (mouseX - cursorX) * easing;
            cursorY += (mouseY - cursorY) * easing;
            
            // 小数点以下を四捨五入してピクセル境界に合わせる
            const roundedX = Math.round(cursorX);
            const roundedY = Math.round(cursorY);
            
            cursor.style.transform = `translate(${roundedX}px, ${roundedY}px) translate(-50%, -50%)`;
            
            // 動きが止まったかチェック
            const distance = Math.abs(mouseX - cursorX) + Math.abs(mouseY - cursorY);
            if (distance < 0.5) {
                isMoving = false;
            }
            
            requestAnimationFrame(updateCursor);
        }

        // カーソル表示/非表示
        document.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            document.body.classList.add('custom-cursor-active');
        });

        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            document.body.classList.remove('custom-cursor-active');
        });

        updateCursor();
    }

    // カスタムカーソルを初期化
    initCustomCursor();

    // --- ステップ式アニメーション ---
    function initFeatureSteps() {
        const steps = document.querySelectorAll('.feature-step');
        const images = document.querySelectorAll('.feature-image');
        let currentStep = 0;
        let autoPlayInterval;
        const INTERVAL_TIME = 3500; // 3.5秒間隔

        function setActiveStep(index) {
            // 有効なインデックスかチェック
            if (index < 0 || index >= steps.length) return;
            
            // すべてのステップを非アクティブに
            steps.forEach((step, i) => {
                step.classList.remove('active', 'completed');
                if (i < index) {
                    step.classList.add('completed');
                } else if (i === index) {
                    step.classList.add('active');
                }
            });

            // すべての画像を非アクティブに（少し遅延させてスムーズに）
            images.forEach((image, i) => {
                image.classList.remove('active');
            });
            
            // アクティブな画像を設定（微小な遅延でスムーズな切り替え）
            setTimeout(() => {
                if (images[index]) {
                    images[index].classList.add('active');
                }
            }, 50);

            currentStep = index;
        }

        function nextStep() {
            const nextIndex = (currentStep + 1) % steps.length;
            setActiveStep(nextIndex);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextStep, INTERVAL_TIME);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }

        // 初期状態を設定
        setActiveStep(0);

        // ステップクリックイベント
        steps.forEach((step, index) => {
            step.addEventListener('click', () => {
                stopAutoPlay();
                setActiveStep(index);
                // 3秒後に自動再生再開（3.5秒間隔に合わせて調整）
                setTimeout(startAutoPlay, 3000);
            });
        });

        // マウスホバーで自動再生を停止/再開
        const container = document.querySelector('.feature-steps-container');
        if (container) {
            container.addEventListener('mouseenter', () => {
                stopAutoPlay();
            });
            container.addEventListener('mouseleave', () => {
                // 少し遅延してから再開（ユーザビリティ向上）
                setTimeout(startAutoPlay, 1000);
            });
        }

        // 自動再生開始
        startAutoPlay();
    }

    // ステップアニメーションを初期化
    initFeatureSteps();

});

// AOSとSplitting.jsの初期化はHTMLの<script>タグ内で行っているため、
// このファイルには含めず、コードを整理しています。
// これにより、ライブラリの初期化とカスタムスクリプトの役割が明確になります。
