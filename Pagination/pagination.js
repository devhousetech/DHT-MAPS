<script async type="module" src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js" fs-list></script>
<script>
const wrapper = document.querySelector('.w-dyn-list');
if (wrapper) {
  wrapper.classList.add('fs-cms_wrapper');

  const listItems = wrapper.querySelector('.w-dyn-items');
  if (listItems) {
    listItems.classList.add('fs-card_list');
    listItems.setAttribute('fs-list-element', 'list');
    listItems.setAttribute('fs-list-load', 'pagination');
    listItems.setAttribute('fs-list-pagesiblings', '2');
    listItems.setAttribute('fs-list-pageboundary', '2');
  }

  const paginationWrapper = wrapper.querySelector('.w-pagination-wrapper');
  if (paginationWrapper) {
    paginationWrapper.classList.add('fs-list_pagination');

    const prev = paginationWrapper.querySelector('.w-pagination-previous');
    if (prev) {
      prev.classList.add('fs-list_pagination_prev', 'is-list-pagination-disabled');
    }

    const next = paginationWrapper.querySelector('.w-pagination-next');
    if (next) {
      next.classList.add('fs-list_pagination_next', 'is-list-pagination-disabled');
    }

    const pageButtonsDiv = document.createElement('div');
    pageButtonsDiv.classList.add('list_page-buttons');

    const pageButton = document.createElement('a');
    pageButton.classList.add('fs-list_pagination_button');
    pageButton.setAttribute('fs-list-element', 'page-button');

    const dotsDiv = document.createElement('div');
    dotsDiv.classList.add('fs-list_pagination_dots');
    dotsDiv.setAttribute('fs-list-element', 'page-dots');

    const dotsP = document.createElement('p');
    dotsP.textContent = '...';
    dotsDiv.appendChild(dotsP);

    pageButtonsDiv.appendChild(pageButton);
    pageButtonsDiv.appendChild(dotsDiv);

    if (next) {
      paginationWrapper.insertBefore(pageButtonsDiv, next);
    } else {
      paginationWrapper.appendChild(pageButtonsDiv);
    }
  }
}
</script>
