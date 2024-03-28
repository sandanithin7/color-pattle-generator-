document.addEventListener('DOMContentLoaded', function() {
    const generatorButton = document.querySelector('.generator-button');
    const colourBlocks = document.querySelectorAll('.colour');

    function generateRandomColor() {
        let chars = "0123456789abcdef";
        let colorlength = 6;
        let color = "";
        for (let i = 0; i < colorlength; i++) {
            let randomcolor = Math.floor(Math.random() * chars.length);
            color = color + chars.substring(randomcolor, randomcolor + 1);
        }
        return '#' + color;
    }

    function updateColor(block, color) {
        const input = block.querySelector('.colour-input');
        input.value = color;
        block.style.backgroundColor = color;
    }

    function copyColor(block) {
        const input = block.querySelector('.colour-input');
        input.select();
        document.execCommand('copy');
    }

    function toggleLock(block) {
        const button = block.querySelector('.lock-toggle');
        const image = button.querySelector('img');
        if (block.classList.contains('locked')) {
            block.classList.remove('locked');
            image.src = './unlock.png';
        } else {
            block.classList.add('locked');
            image.src = './lock (1).png';
        }
    }

    function generatePalette() {
        colourBlocks.forEach(block => {
            if (!block.classList.contains('locked')) {
                updateColor(block, generateRandomColor());
            }
        });
    }

    generatorButton.addEventListener('click', generatePalette);
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            generatePalette();
        }
    });

    colourBlocks.forEach(block => {
        block.querySelector('.lock-toggle').addEventListener('click', function() {
            toggleLock(block);
        });
        block.querySelector('.copy-hex').addEventListener('click', function() {
            copyColor(block);
        });
    });

    generatePalette();
});
