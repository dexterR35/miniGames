// Keep existing WebGL code...

// Card data array with improved prizes
const cardData = [
    {
        id: 1,
        frontTitle: "1",
        backText: "Surprise!",
        prize: "Romantic Dinner Date 🍝"
    },
    {
        id: 2,
        frontTitle: "2",
        backText: "Surprise!",
        prize: "Movie Night & Cuddles 🎬"
    },
    {
        id: 3,
        frontTitle: "3",
        backText: "Surprise!",
        prize: "Ice Cream Adventure 🍦"
    },
    {
        id: 4,
        frontTitle: "4",
        backText: "Surprise!",
        prize: "Picnic in the Park 🧺"
    },
    {
        id: 5,
        frontTitle: "5",
        backText: "Surprise!",
        prize: "Dance Under the Stars 💃"
    }
];

// Function to generate card HTML
function generateCards() {
    const cardsContainer = $('.cards-container');
    cardsContainer.empty();
    
    cardData.forEach(card => {
        const cardHTML = `
            <div class="card" data-prize="${card.prize}">
                <div class="card-inner">
                    <div class="card-front">
                        <h3>${card.frontTitle}</h3>
                    </div>
                    <div class="card-back">
                        <p>${card.backText}</p>
                    </div>
                </div>
                <div class="prize-popup">
                    <h2>Congratulations! 🎉</h2>
                    <p>You won</p>
                    <h3>${card.prize}</h3>
                    <button class="claim-btn">Claim Prize</button>
                </div>
            </div>
        `;
        cardsContainer.append(cardHTML);
    });
}

// Initialize everything when document is ready
$(document).ready(function() {
    // Generate cards first
    generateCards();
    
    let isCardClicked = false;
    
    // Event delegation for card click (since cards are generated dynamically)
    $('.cards-container').on('click', '.card', function() {
        if (isCardClicked) return;
        isCardClicked = true;
        
        // Play card flip sound
        $('#cardFlip')[0].play();
        
        // Door opening animation
        $(this).addClass('door-open clicked');
        
        // Show prize popup after door animation
        setTimeout(() => {
            $(this).find('.prize-popup').addClass('show');
        }, 800);
    });
    
    // Event delegation for hover effects
    $('.cards-container').on('mousemove', '.card', function(e) {
        const card = $(this);
        const rect = card[0].getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 30;
        const angleY = -(x - centerX) / 30;
        
        card.find('.card-inner').css('transform', 
            `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`);
    });
    
    $('.cards-container').on('mouseleave', '.card', function() {
        $(this).find('.card-inner').css('transform', '');
    });
    
    // Claim prize button handler
    $('.cards-container').on('click', '.claim-btn', function(e) {
        e.stopPropagation(); // Prevent card click event
        
        // Multiple confetti bursts
        const confettiSettings = {
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff6b6b', '#4facfe', '#00f2fe', '#ff8e8e', '#FFD700', '#FF69B4'],
        };

        // First burst
        confetti({
            ...confettiSettings,
            angle: 60,
            origin: { x: 0.2, y: 0.8 }
        });

        // Second burst
        setTimeout(() => {
            confetti({
                ...confettiSettings,
                angle: 120,
                origin: { x: 0.8, y: 0.8 }
            });
        }, 150);

        // Center burst
        setTimeout(() => {
            confetti({
                ...confettiSettings,
                angle: 90,
                origin: { x: 0.5, y: 0.8 }
            });
        }, 300);
        
        // Play success sound
        $('#success')[0].play();
        
        // Show claimed alert after confetti
        setTimeout(() => {
            alert('Prize claimed successfully! 🎉\nEnjoy your special Valentine\'s treat!');
        }, 1000);
    });
    
    $(window).on('click', function(event) {
        if ($(event.target).is('#prizeModal')) {
            $('#prizeModal').fadeOut();
        }
    });
    
    // Add 3D arrangement of cards
    function arrangeCards() {
        const cards = $('.card');
        const radius = 10; // Adjust this value to change the circle size
        const totalCards = cards.length;
        
        cards.each((index, card) => {
            const angle = (index / totalCards) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            $(card).css('transform', 
                `translateX(${x}px) translateZ(${z}px) rotateY(${-angle * (180/Math.PI)}deg)`);
        });
    }
    
    // Call arrangeCards after generating cards
    arrangeCards();
    
    // Update arrangement on window resize
    $(window).on('resize', arrangeCards);
});

class ValentineGame {
    constructor() {
        this.prizes = [
            { id: 1, text: "Romantic Dinner Date 🍝", image: "dinner.jpg" },
            { id: 2, text: "Movie Night & Cuddles 🎬", image: "movie.jpg" },
            { id: 3, text: "Ice Cream Adventure 🍦", image: "icecream.jpg" },
            { id: 4, text: "Picnic in the Park 🧺", image: "picnic.jpg" },
            { id: 5, text: "Dance Under the Stars 💃", image: "dance.jpg" }
        ];

        this.initPixi();
        this.init();
    }

    initPixi() {
        // Create PIXI Application with correct initialization
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x1a1a2e,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            view: document.createElement('canvas')
        });

        // Keep the existing container and just add the PIXI canvas to it
        const container = document.querySelector('.cards-container');
        container.appendChild(this.app.view);
    }

    init() {
        this.cards = [];
        this.createCards();
        this.setupEventListeners();
    }

    createCards() {
        const cardWidth = 180;
        const cardHeight = 250;
        const padding = 20;
        const totalWidth = (cardWidth + padding) * this.prizes.length;
        const startX = (window.innerWidth - totalWidth) / 2 + cardWidth / 2;

        this.prizes.forEach((prize, index) => {
            const card = this.createCard(prize);
            card.x = startX + index * (cardWidth + padding);
            card.y = window.innerHeight / 2 - 100; // Adjust Y position
            this.app.stage.addChild(card);
            this.cards.push(card);
        });
    }

    createCard(prize) {
        const card = new PIXI.Container();
        
        // Create card background
        const cardBase = new PIXI.Graphics();
        cardBase.beginFill(0xff6b6b);
        cardBase.drawRoundedRect(-90, -125, 180, 250, 15);
        cardBase.endFill();

        // Add gradient overlay
        const gradient = new PIXI.Graphics();
        gradient.beginFill(0xffffff, 0.1);
        gradient.drawRoundedRect(-90, -125, 180, 250, 15);
        gradient.endFill();

        // Add number
        const text = new PIXI.Text(prize.id.toString(), {
            fontFamily: 'Poppins',
            fontSize: 48,
            fill: 0xffffff,
            align: 'center',
            fontWeight: 'bold'
        });
        text.anchor.set(0.5);

        // Add components to card
        card.addChild(cardBase);
        card.addChild(gradient);
        card.addChild(text);

        // Make interactive
        card.interactive = true;
        card.buttonMode = true;
        
        // Store prize data
        card.prizeData = prize;

        // Add hover effects
        card.on('pointerover', () => {
            gsap.to(card.scale, { x: 1.1, y: 1.1, duration: 0.3 });
            gsap.to(card, { rotation: Math.PI / 16, duration: 0.3 });
        });

        card.on('pointerout', () => {
            gsap.to(card.scale, { x: 1, y: 1, duration: 0.3 });
            gsap.to(card, { rotation: 0, duration: 0.3 });
        });

        card.on('pointerdown', () => {
            if (!card.clicked) {
                card.clicked = true;
                this.showPrizeModal(prize);
                gsap.to(card.scale, { x: 0.9, y: 0.9, duration: 0.2, yoyo: true, repeat: 1 });
            }
        });

        return card;
    }

    showPrizeModal(prize) {
        const modal = document.createElement('div');
        modal.className = 'prize-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Congratulations! 🎉</h2>
                <p>You won</p>
                <h3>${prize.text}</h3>
                <button class="claim-btn">Claim Prize</button>
            </div>
        `;

        document.body.appendChild(modal);

        gsap.from(modal.querySelector('.modal-content'), {
            scale: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
        });

        modal.querySelector('.claim-btn').addEventListener('click', () => {
            this.triggerConfetti();
            setTimeout(() => {
                alert('Prize claimed successfully! 🎉');
                modal.remove();
            }, 500);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    triggerConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff6b6b', '#4facfe', '#00f2fe', '#ff8e8e', '#FFD700', '#FF69B4']
        });
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight);
            this.repositionCards();
        });
    }

    repositionCards() {
        const cardWidth = 180;
        const padding = 20;
        const totalWidth = (cardWidth + padding) * this.prizes.length;
        const startX = (window.innerWidth - totalWidth) / 2 + cardWidth / 2;

        this.cards.forEach((card, index) => {
            gsap.to(card, {
                x: startX + index * (cardWidth + padding),
                y: window.innerHeight / 2,
                duration: 0.5
            });
        });
    }
}

// Initialize game when document is ready
$(document).ready(() => {
    new ValentineGame();
}); 