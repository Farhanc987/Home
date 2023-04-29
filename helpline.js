const parentContainer = document.querySelector('.rm-repository');

parentContainer.addEventListener('click', event => {

    const current = event.target;

    const isReadMoreBtn = current.className.includes('rm-btn');

    if (!isReadMoreBtn) return;

    const currentText = event.target.parentNode.querySelector('.rm-body');

    currentText.classList.toggle('rm-body--show');

    current.textContent = current.textContent.includes('Read More') ? "Read Less..." : "Read More...";

})
