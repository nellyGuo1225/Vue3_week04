const { createApp } = Vue;
const url = "https://vue3-course-api.hexschool.io/v2";
const path = "nian-api";

const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
axios.defaults.headers.common['Authorization'] = token; 

const app = createApp({
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            axios.post(`${url}/admin/signin`, this.user)
                .then((res) => {
                    alert(res.data.message);
                    // console.log(this.user);
                    const {token, expired} = res.data;
                    document.cookie = `hexToken=${ token }; expires=${ new Date(expired)}`;
                    //this.checkLogin();
                    window.location.href="./product.html"
                })
                .catch((error) => {
                    alert(`${error.data.message}，請輸入正確資料並再次登入。`);
                })
        },
        

    },
});

app.mount('#app');