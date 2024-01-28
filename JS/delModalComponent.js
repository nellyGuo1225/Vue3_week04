export default {
    props: ['tempProduct', 'deleteProduct'],
    data() {
        return {
            delModal: null
        }
      },
      methods: {
        openModal() {
          this.delModal.show();
        },
        closeModal() {
          this.delModal.hide();
        }
      },
      mounted() {
        this.delModal = new bootstrap.Modal(this.$refs.delModal);
      },
    template: `  <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="delModalLabel"
    aria-hidden="true" ref="delModal">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="delModalLabel">產品內容</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-8">
                        <div class="mb-3">
                            <label for="title" class="form-label">產品名稱</label>
                            <input type="text" class="form-control" id="title"
                                v-model="tempProduct.title" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">產品描述</label>
                            <textarea class="form-control" id="description" rows="3"
                                v-model="tempProduct.description" disabled></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="content" class="form-label">產品內容</label>
                            <textarea class="form-control" id="content" rows="3"
                                v-model="tempProduct.content" disabled></textarea>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label for="category" class="form-label">分類</label>
                                    <input type="text" class="form-control" id="category"
                                        v-model="tempProduct.category" disabled>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <label for="unit" class="form-label">單位</label>
                                    <input type="text" class="form-control" id="unit"
                                        v-model="tempProduct.unit" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label for="origin_price" class="form-label">原價</label>
                                    <input type="number" class="form-control" id="origin_price"
                                        v-model="tempProduct.origin_price" disabled>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <label for="price" class="form-label">售價</label>
                                    <input type="number" class="form-control" id="price"
                                        v-model="tempProduct.price" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" role="switch"
                                id="isEnable" :true-value="1" :false-value="0"
                                v-model="tempProduct.is_enabled" disabled>
                            <label class="form-check-label" for="isEnable">是否啟用</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="mb-3">
                            <label for="image" class="form-label">圖片主圖</label>
                            <input type="url" class="form-control" id="image"
                                v-model="tempProduct.imageUrl" disabled>
                            <img v-if="tempProduct.imageUrl !== undefined"
                                :src="tempProduct.imageUrl" alt="圖片主圖" class="mt-3 img-thumbnail">
                        </div>
                        <h5>多圖新增</h5>
                        <div class="mb-3" v-for="(img,index) in tempProduct.imagesUrl" :key="img">
                            <label :for="index" class="form-label">輸入圖片網址
                                {{index+1}}</label>
                            <input type="url" class="form-control" :id="index"
                                v-model="tempProduct.imagesUrl[index]" disabled>
                            <img :src="img" :alt="'圖片'+(index+1)" class="mt-3 img-thumbnail">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <p class="text-danger fw-bold">按下確認後，商品資料將永久刪除，請確認是否刪除產品?</p>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
            </div>
        </div>
    </div>
</div>`
}