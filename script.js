// The 4 Gadys — site interactions

document.addEventListener('DOMContentLoaded', function () {

    /* ---- Blog: read more / read less toggle ---- */
    document.querySelectorAll('.read-more-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var full = btn.previousElementSibling;
            if (!full) return;
            var isOpen = full.classList.toggle('open');
            btn.textContent = isOpen ? 'Read less ↑' : 'Read more →';
        });
    });

    /* ---- Blog: like button (remembers per browser) ---- */
    document.querySelectorAll('.like-btn').forEach(function (btn) {
        var postId = btn.getAttribute('data-post-id');
        var storeKey = 'gadys-like-' + postId;
        var baseCount = parseInt(btn.getAttribute('data-base-count'), 10) || 0;
        var countEl = btn.querySelector('.like-count');
        var heartEl = btn.querySelector('.heart');

        var liked = false;
        try { liked = localStorage.getItem(storeKey) === '1'; } catch (e) {}

        function render() {
            btn.classList.toggle('liked', liked);
            if (countEl) countEl.textContent = liked ? baseCount + 1 : baseCount;
            if (heartEl) heartEl.textContent = liked ? '❤️' : '🤍';
        }
        render();

        btn.addEventListener('click', function () {
            liked = !liked;
            try { localStorage.setItem(storeKey, liked ? '1' : '0'); } catch (e) {}
            render();
            btn.classList.remove('bump');
            void btn.offsetWidth;
            btn.classList.add('bump');
        });
    });

});