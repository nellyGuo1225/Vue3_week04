import pagenation from './pageComponent.js'
import updateModal from './updateModalComponent.js'
import delModal from './delModalComponent.js'

const { createApp } = Vue;
const url = "https://vue3-course-api.hexschool.io/v2";
const path = "nian-api";

const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
axios.defaults.headers.common['Authorization'] = token; 

if(token === "" || token === null){
    window.location.href="./login.html"
}

let myToast = null;


const app = createApp({
    data() {
        return {
            tempProduct: {
                imagesUrl:[]
            },
            product: {},
            products: [],
            isNew: false,
            toastContent:'Hi',
            pagination: {}
        }
    },
    components: {
        pagenation,
        updateModal,
        delModal
    },
    methods: {
        getProducts(page = 1) {
            axios.get(`${url}/api/${path}/admin/products/?page=${page}`)
                .then((res) => {
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                })
                .catch((error) => {
                    console.dir(error);
                    alert(error.data.message);
                    window.location.href="./login.html"
                })
        },
        checkLogin() {
            axios.post(`${url}/api/user/check`)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => {
                    console.dir(error);
                    alert(error.data.message);
                    window.location.href="./login.html"
                })
        },
        openModal(status, item) {
            if(status === 'new') {
                this.tempProduct = {
                    imagesUrl:[]
                }
                this.isNew = true;
                this.$refs.uModal.openModal();
                
            }else if(status === 'edit') {
                this.tempProduct = {
                    imagesUrl:[],
                    ...item,
                };
                this.isNew = false;
                this.$refs.uModal.openModal();
            }else {
                this.tempProduct = {...item};
                this.$refs.dModal.openModal();
            }
            
        },
        createNewProduct() {
            this.product.data = this.tempProduct;
            axios.post(`${url}/api/${path}/admin/product`,this.product)
                .then((res) => {
                    this.$refs.uModal.closeModal();
                    this.toastContent = '產品建立成功。';
                    myToast.show();
                    this.getProducts();
                })
                .catch((error) => {
                    alert(error.data.message);
                })
        },
        deleteProduct() {
            axios.delete(`${url}/api/${path}/admin/product/${this.tempProduct.id}`)
                .then((res) => {
                    this.toastContent = '成功刪除一筆資料。';
                    myToast.show();
                    this.getProducts();
                    this.$refs.dModal.closeModal();
                })
                .catch((error) => {
                    alert(error.data.message);
                })
        },
        confirmEdit() {
            this.product.data = this.tempProduct;
            axios.put(`${url}/api/${path}/admin/product/${this.tempProduct.id}`, this.product)
                .then((res) => {
                    this.toastContent = '修改成功。';
                    this.$refs.uModal.closeModal();
                    myToast.show();
                    this.getProducts();
                })
                .catch((error) => {
                    alert(error.data.message);
                })
        }
    },
    mounted() {

        this.checkLogin();
        this.getProducts();
        
        //toast
        myToast = new bootstrap.Toast(document.getElementById('myToast'));
    },
});

app.mount('#app');