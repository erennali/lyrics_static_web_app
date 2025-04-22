document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('lyricsForm');
    const artistInput = document.getElementById('artist');
    const titleInput = document.getElementById('title');
    const lyricsText = document.getElementById('lyricsText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const alertSuccess = document.getElementById('alertSuccess');
    const alertDanger = document.getElementById('alertDanger');
    const lyricsContainer = document.querySelector('.lyrics-container');

    // Hide alerts initially
    alertSuccess.style.display = 'none';
    alertDanger.style.display = 'none';
    lyricsContainer.style.display = 'none';

    // Add animation classes to elements
    document.querySelectorAll('.form-group').forEach((group, index) => {
        setTimeout(() => {
            group.classList.add('fade-in');
        }, index * 200);
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset previous states
        lyricsText.textContent = '';
        alertSuccess.style.display = 'none';
        alertDanger.style.display = 'none';
        lyricsContainer.style.display = 'none';
        lyricsContainer.classList.remove('show');
        
        // Show loading spinner with animation
        loadingSpinner.style.display = 'block';
        loadingSpinner.classList.add('fade-in');
        
        try {
            const artist = encodeURIComponent(artistInput.value.trim());
            const title = encodeURIComponent(titleInput.value.trim());
            
            const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
            
            if (!response.ok) {
                throw new Error('Lyrics not found');
            }
            
            const data = await response.json();
            
            if (data.lyrics) {
                lyricsText.textContent = data.lyrics;
                lyricsContainer.style.display = 'block';
                setTimeout(() => {
                    lyricsContainer.classList.add('show');
                }, 100);
                alertSuccess.style.display = 'block';
                alertSuccess.classList.add('fade-in');
                
                // Scroll to lyrics with smooth animation
                lyricsContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                throw new Error('No lyrics found');
            }
        } catch (error) {
            alertDanger.style.display = 'block';
            alertDanger.classList.add('fade-in');
        } finally {
            loadingSpinner.style.display = 'none';
        }
    });

    // Form validation with animation
    form.addEventListener('input', function() {
        const button = form.querySelector('button[type="submit"]');
        if (artistInput.value.trim() && titleInput.value.trim()) {
            button.disabled = false;
            button.classList.add('pulse');
        } else {
            button.disabled = true;
            button.classList.remove('pulse');
        }
    });

    // Initial button state
    form.querySelector('button[type="submit"]').disabled = true;

    // Add hover effect to input groups
    document.querySelectorAll('.input-group').forEach(group => {
        group.addEventListener('mouseenter', () => {
            group.classList.add('pulse');
        });
        group.addEventListener('mouseleave', () => {
            group.classList.remove('pulse');
        });
    });
}); 