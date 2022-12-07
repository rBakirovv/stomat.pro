const requisitesModal = document.querySelector('.requisites');

const openRequisitesModal = () => {
  requisitesModal.classList.add('requisites_active');
  requisitesModal.addEventListener("click", handleCloseRequisitesModal);
};

const handleCloseRequisitesModal = (e) => {
  if (e.target.classList.contains('close-button')) {
    closeRequisitesModal();
    requisitesModal.removeEventListener("click", handleCloseRequisitesModal);
  }
  if (e.target.classList.contains('requisites_active')) {
    closeRequisitesModal();
    requisitesModal.removeEventListener("click", handleCloseRequisitesModal);
  }
}

const closeRequisitesModal = () => {
  requisitesModal.classList.remove("requisites_active");
};