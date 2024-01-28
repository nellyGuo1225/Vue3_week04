export default {
  props: ['tempProduct', 'createNewProduct', 'confirmEdit','isNew'],
  data() {
    return {
      updateModal: null
    }
  },
  methods: {
    openModal() {
      this.updateModal.show();
    },
    closeModal() {
      this.updateModal.hide();
    }
  },
  mounted() {
    this.updateModal = new bootstrap.Modal(this.$refs.updateModal);
  },
  template: `<div class="modal fade" id="updateProductModal" tabindex="-1" aria-labelledby="updateProductModalLabel"
  aria-hidden="true" ref="updateModal">
  <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="updateProductModalLabel" v-if="isNew">新增產品</h5>
              <h5 class="modal-title" id="updateProductModalLabel" v-else>編輯產品</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="row">
                  <div class="col-sm-8">
                      <div class="mb-3">
                          <label for="title" class="form-label">產品名稱</label>
                          <input type="text" class="form-control" id="title" v-model="tempProduct.title">
                      </div>
                      <div class="mb-3">
                          <label for="description" class="form-label">產品描述</label>
                          <textarea class="form-control" id="description" rows="3"
                          v-model="tempProduct.description"></textarea>
                      </div>
                      <div class="mb-3">
                          <label for="content" class="form-label">產品內容</label>
                          <textarea class="form-control" id="content" rows="3"
                          v-model="tempProduct.content"></textarea>
                      </div>
                      <div class="row">
                          <div class="col-6">
                              <div class="mb-3">
                                  <label for="category" class="form-label">分類</label>
                                  <input type="text" class="form-control" id="category"
                                  v-model="tempProduct.category">
                              </div>
                          </div>
                          <div class="col-6">
                              <div class="mb-3">
                                  <label for="unit" class="form-label">單位</label>
                                  <input type="text" class="form-control" id="unit"
                                  v-model="tempProduct.unit">
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-6">
                              <div class="mb-3">
                                  <label for="origin_price" class="form-label">原價</label>
                                  <input type="number" class="form-control" id="origin_price"
                                  v-model="tempProduct.origin_price">
                              </div>
                          </div>
                          <div class="col-6">
                              <div class="mb-3">
                                  <label for="price" class="form-label">售價</label>
                                  <input type="number" class="form-control" id="price"
                                  v-model="tempProduct.price">
                              </div>
                          </div>
                      </div>
                      <div class="form-check form-switch mb-3">
                          <input class="form-check-input" type="checkbox" role="switch" id="isEnable" :true-value="1"
                              :false-value="0" v-model="tempProduct.is_enabled">
                          <label class="form-check-label" for="isEnable">是否啟用</label>
                      </div>
                  </div>
                  <div class="col-sm-4">
                      <div class="mb-3">
                        <label for="image" class="form-label">圖片主圖</label>
                        <input type="url" class="form-control" id="image" v-model="tempProduct.imageUrl">
                        <img v-if="tempProduct.imageUrl !== undefined" :src="tempProduct.imageUrl" alt="圖片主圖"
                            class="mt-3 img-thumbnail">
                    </div>
                    <div>
                        <h5>多圖新增</h5>
                        <button type="button" class="btn btn-outline-primary mb-3"
                            @click="tempProduct.imagesUrl.push('')">新增圖片</button>
                        <div class="mb-3" v-for="(img,index) in tempProduct.imagesUrl" :key="img">
                            <label :for="index" class="form-label">輸入圖片網址
                                {{index+1}}</label>
                            <div class="row">
                                <div class="col-9"><input type="url" class="form-control" :id="index"
                                        v-model="tempProduct.imagesUrl[index]">
                                </div>
                                <div class="col-3">
                                    <button type="button" class="btn btn-outline-danger"
                                        @click="tempProduct.imagesUrl.splice(index,1)">刪除</button>
                                </div>
                            </div>
                            <img :src="img" :alt="'圖片'+(index+1)" class="mt-3 img-thumbnail">
                        </div>
                    </div>
                  </div>
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="createNewProduct()" v-if="isNew">建立產品</button>
              <button type="button" class="btn btn-primary" @click="confirmEdit()" v-else>儲存</button>
          </div>
      </div>
  </div>
  </div>`
}