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

const app = createApp({
    data() {
        return {
            tempProduct: {
                data: {}
            },
            products: [],
            product: {
                data: {
                    title: '',
                    category: '',
                    origin_price: 0,
                    price: 0,
                    unit: '個',
                    description: '',
                    content: '',
                    is_enabled: 1,
                    imageUrl: 'https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80',
                    imagesUrl: [
                        'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80',
                        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
                        'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1948&q=80',
                        'https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
                        'https://images.unsplash.com/photo-1511914265872-c40672604a80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80'
                    ]
                }
            },
            addProductModal: {},
            editProductModal: {},
            myToast: {},
            toastContent: 'Hi'
        }
    },
    methods: {
        getProducts() {
            axios.get(`${url}/api/${path}/admin/products`)
                .then((res) => {
                    console.log(res);
                    this.products = res.data.products;
                })
                .catch((error) => {
                    console.dir(error);
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
                    window.location.href="./login.html"
                })
        },
        createNewProduct() {
            axios.post(`${url}/api/${path}/admin/product`,this.product)
                .then((res) => {
                    this.addProductModal.hide();
                    this.toastContent = '產品建立成功。';
                    this.myToast.show();
                    this.getProducts();
                })
                .catch((error) => {
                    console.dir(error);
                })
        },
        deleteProduct(id) {
            axios.delete(`${url}/api/${path}/admin/product/${id}`)
                .then((res) => {
                    this.toastContent = '成功刪除一筆資料。';
                    this.myToast.show();
                    this.getProducts();
                })
                .catch((error) => {
                    console.dir(error);
                })
        },
        prepareEdit(item) {
            this.tempProduct.data = JSON.parse(JSON.stringify(item));
        },
        confirmEdit(id) {
            axios.put(`${url}/api/${path}/admin/product/${id}`,this.tempProduct)
                .then((res) => {
                    console.log(res.data);
                    this.toastContent = '修改成功。';
                    this.editProductModal.hide();
                    this.myToast.show();
                    this.getProducts();
                })
                .catch((error) => {
                    console.dir(error);
                })
        }
    },
    mounted() {
        this.checkLogin();
        this.getProducts();
        
        //Modal
        this.addProductModal = new bootstrap.Modal(document.getElementById('newProductModal'), {
            keyboard: false,
          });
        
        this.editProductModal = new bootstrap.Modal(document.getElementById('editModal'), {
            keyboard: false,
          });

        //toast
        this.myToast = new bootstrap.Toast(document.getElementById('myToast'));
    },
});

app.mount('#app');