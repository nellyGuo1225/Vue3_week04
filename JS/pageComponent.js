export default {
    props: ['pagination','getProducts'],
    template: ` 
    <nav aria-label="Page navigation example">
      <ul class="pagination">
          <li class="page-item" :class="{ 'disabled':!pagination.has_pre }" >
              <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page -1)">Previous</a>
          </li>
          <li class="page-item" :class="{ 'active': page === pagination.current_page }"  v-for="page in pagination.total_pages" :key="page.current_page+'a'">
              <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ 'disabled':!pagination.has_next }">
              <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page +1)">Next</a>.
          </li>
      </ul>
    </nav>`
}