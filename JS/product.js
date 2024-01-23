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

let updateModal = null;
let delModal = null;
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
            toastContent:'Hi'
        }
    },
    methods: {
        getProducts() {
            axios.get(`${url}/api/${path}/admin/products`)
                .then((res) => {
                    this.products = res.data.products;
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
                updateModal.show();
                
            }else if(status === 'edit') {
                this.tempProduct = {
                    imagesUrl:[],
                    ...item,
                };
                this.isNew = false;
                updateModal.show();
            }else {
                this.tempProduct = {...item};
                delModal.show();
            }
            
        },
        createNewProduct() {
            this.product.data = this.tempProduct;
            axios.post(`${url}/api/${path}/admin/product`,this.product)
                .then((res) => {
                    updateModal.hide();
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
                    delModal.hide();
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
                    updateModal.hide();
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
        
        //Modal
        updateModal = new bootstrap.Modal(document.getElementById('updateProductModal'), {
            keyboard: false,
          });
        
        delModal = new bootstrap.Modal(document.getElementById('delModal'), {
            keyboard: false,
          });

        //toast
        myToast = new bootstrap.Toast(document.getElementById('myToast'));
    },
});

app.mount('#app');