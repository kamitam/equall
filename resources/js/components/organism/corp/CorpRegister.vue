<template>
    <div class="corp-register pa-2">
        <v-form
            ref="form"
        >
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <div class="corp-register__image-uploader-wrap">
                            <div class="corp-register__image-uploader-title">
                                不動産の画像
                            </div>
                            <image-uploader
                                ref="uploader"
                                @upload-success="uploadImageSuccess"
                                @before-remove="beforeRemove"
                            >
                            </image-uploader>
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <v-select
                            class="required"
                            v-model="property.type"
                            :items="types"
                            :rules="rule_required"
                            label="種類"
                            required
                        ></v-select>
                    </v-col>

                    <v-col cols="4">
                        <v-select
                            class="required"
                            v-model="property.is_pet"
                            :items="is_pet"
                            :rules="rule_required"
                            label="ペット飼育"
                            required
                        ></v-select>
                    </v-col>

                    <v-col cols="4">
                        <v-select
                            class="required"
                            v-model="property.property_type"
                            :items="property_types"
                            :rules="rule_required"
                            label="物件種別"
                            required
                        ></v-select>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            class="required"
                            v-model="property.name"
                            :counter="200"
                            :rules="rule_required_limit200"
                            label="物件名"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            v-model="property.hitokoto"
                            :counter="200"
                            :rules="rule_limit200"
                            label="この物件への一言"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            v-model="property.good"
                            :counter="200"
                            :rules="rule_limit200"
                            label="Goodポイント"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            v-model="property.bad"
                            :counter="200"
                            :rules="rule_limit200"
                            label="Badポイント"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-layout row wrap>
                            <v-flex>
                                <v-checkbox
                                    v-model="property.pet_type_set"
                                    label="猫"
                                    value="cat"
                                ></v-checkbox>
                            </v-flex>
                            <v-flex>
                                <v-checkbox
                                    v-model="property.pet_type_set"
                                    label="小型犬"
                                    value="small"
                                ></v-checkbox>
                            </v-flex>
                            <v-flex>
                                <v-checkbox
                                    v-model="property.pet_type_set"
                                    label="中型犬"
                                    value="middle"
                                ></v-checkbox>
                            </v-flex>
                            <v-flex>
                                <v-checkbox
                                    v-model="property.pet_type_set"
                                    label="大型犬"
                                    value="large"
                                ></v-checkbox>
                            </v-flex>
                        </v-layout>
                    </v-col>

                    <v-col cols="6">
                        <v-select
                            v-model="property.pet_cnt"
                            :items="pet_cnt"
                            label="ペットの数"
                        ></v-select>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            class="required"
                            v-model="property.nearest_station"
                            :rules="rule_required"
                            label="最寄駅"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-select
                            class="required"
                            v-model="property.minutes_on"
                            :items="minutes_on"
                            :rules="rule_required"
                            label="駅までの所要時間"
                            required
                        ></v-select>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            class="required"
                            v-model="property.address"
                            :count="200"
                            :rules="rule_required_limit200"
                            label="所在地"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            class="required"
                            v-model="property.cost"
                            :count="10"
                            :rules="rule_required"
                            type="number"
                            prefix="¥"
                            label="家賃"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            v-model="property.manage_cost"
                            :count="10"
                            type="number"
                            prefix="¥"
                            label="管理費"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="3">
                        <v-select
                            class="required"
                            v-model="property.deposit"
                            :items="deposit"
                            :rules="rule_required"
                            label="敷金"
                            required
                        ></v-select>
                    </v-col>

                    <v-col cols="3">
                        <v-select
                            v-model="property.deposit_for_pet"
                            :items="deposit"
                            label="ペット飼育時追加敷金"
                        ></v-select>
                    </v-col>

                    <v-col cols="3">
                        <v-select
                            class="required"
                            v-model="property.key_money"
                            :items="key_money"
                            :rules="rule_required"
                            label="礼金"
                            required
                        ></v-select>
                    </v-col>

                    <v-col cols="3">
                        <v-select
                            v-model="property.deposit_ex"
                            :items="deposit"
                            label="保証金"
                        ></v-select>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            v-model="property.update_cost"
                            :count="10"
                            type="number"
                            prefix="¥"
                            label="更新料"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            v-model="property.insurance"
                            :count="10"
                            type="number"
                            prefix="¥"
                            label="保険等"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                        <v-text-field
                            v-model="property.insurance_corp"
                            :counter="200"
                            :rules="rule_limit200"
                            label="家賃保証会社等"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                        <v-text-field
                            v-model="property.cost_memo"
                            :counter="200"
                            :rules="rule_limit200"
                            label="その他費用"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                        <v-text-field
                            v-model="property.deal_form"
                            :counter="200"
                            :rules="rule_limit200"
                            label="取引形態"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                        <v-text-field
                            class="required"
                            v-model="property.area"
                            type="number"
                            label="専有面積"
                            hint="小数点第二位まで丸められます"
                            :rules="rule_required"
                            suffix="㎡"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                        <v-select
                            class="required"
                            v-model="property.floor_plan"
                            :items="floor_plan"
                            :rules="rule_required"
                            label="間取り"
                            required
                        ></v-select>
                    </v-col>

                    <v-col cols="4">
                        <v-text-field
                            v-model="property.floor"
                            :rules="rule_limit200"
                            label="階数"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                        <v-text-field
                            class="required"
                            v-model="property.age"
                            type="month"
                            label="築年月"
                            :rules="rule_required"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                        <v-select
                            class="required"
                            v-model="property.structure"
                            :items="structure"
                            label="建物構造"
                            :rules="rule_required"
                            required
                        ></v-select>
                    </v-col>

                    <v-col cols="4">
                        <v-select
                            v-model="property.park"
                            :items="park"
                            label="駐車場の有無"
                        ></v-select>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            v-model="property.move_in_date"
                            label="入居可能日"
                            :rules="rule_required"
                            type="date"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            v-model="property.other_condition"
                            :counter="200"
                            :rules="rule_limit200"
                            label="その他条件"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            class="required"
                            v-model="property.start_date"
                            label="掲載開始日"
                            :rules="rule_required"
                            type="date"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            class="required"
                            v-model="corpName"
                            :count="200"
                            :rules="rule_limit200"
                            label="取扱不動産店"
                            disabled
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-btn
                            color="#76c3bf"
                            dark
                            class="mr-4"
                            @click="submit"
                        >
                            物件を登録
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<style lang="sass">
    @import "../../../../sass/common/_variable.scss"
    .corp-register
        &__image-uploader-wrap
            margin-bottom: 30px

        &__image-uploader-title
            color: rgba(0, 0, 0, 0.6)
            margin-bottom: 10px

</style>

<script>
    import VueUploadMultipleImage from 'vue-upload-multiple-image';
    import ImageUploader from "../../organism/corp/ImageUploader";

    export default {
        components: {
            VueUploadMultipleImage,
            ImageUploader,
        },
        props: ['property', 'snackbar_text_success'],
        computed: {
            corpName: {
                get() {
                    return this.$store.state.auth_corp.corp_name;
                }
            },
            corpId: {
                get() {
                    return this.$store.state.auth_corp.id;
                }
            }
        },
        data() {
            return {
                isEdited: false,
                rule_required:
                    [
                        v => !!v || 'この項目は必須です',
                    ],
                rule_limit200:
                    [
                        v => !v || v.length <= 200 || 'この項目は200文字が最大です。',
                    ],
                rule_required_limit200:
                    [
                        v => !!v || 'この項目は必須です',
                        v => !v || v.length <= 200 || 'この項目は200文字が最大です。',
                    ],
                types: ["賃貸"],
                property_types: ["マンション", "アパート", "戸建て", "テラスハウス", "シェアハウス"],
                pet_types: ["犬", "猫", "犬と猫"],
                pet_cnt: ["1頭", "2頭", "3頭", "4頭", "5頭", "上限なし", "お問い合わせください"],
                minutes_on: [
                    "徒歩1分", "徒歩2分", "徒歩3分", "徒歩4分", "徒歩5分",
                    "徒歩6分", "徒歩7分", "徒歩8分", "徒歩9分", "徒歩10分",
                    "徒歩11分", "徒歩12分", "徒歩13分", "徒歩14分", "徒歩15分",
                    "徒歩16分", "徒歩17分", "徒歩18分", "徒歩19分", "徒歩20分",
                    "徒歩21分", "徒歩22分", "徒歩23分", "徒歩24分", "徒歩25分",
                    "徒歩26分", "徒歩27分", "徒歩28分", "徒歩29分", "徒歩30分",
                ],
                deposit: ["0ヵ月分", "1ヶ月分", "2ヶ月分", "3ヶ月分", "4ヶ月分", "5ヶ月分", "お問い合わせください"],
                key_money: ["0ヵ月分", "1ヶ月分", "2ヶ月分", "3ヶ月分", "4ヶ月分", "5ヶ月分", "お問い合わせください"],
                floor_plan: [
                    "1LDK", "1DK", "1SLDK", "1K", "1R",
                    "2LDK", "2DK", "2SLDK", "2K", "2R",
                    "3LDK", "3DK", "3SLDK", "3K", "3R",
                    "4LDK", "4DK", "4SLDK", "4K", "4R",
                    "5LDK", "5DK", "5SLDK", "5K", "5R",
                    "6LDK", "6DK", "6SLDK", "6K", "6R",
                    "7LDK", "7DK", "7SLDK", "7K", "7R",
                    "お問い合わせください",
                ],
                is_pet: ["可"],
                structure: ["木造", "鉄骨造", "鉄筋コンクリート", "鉄骨鉄筋コンクリート", "その他"],
                park: ["有", "無"],
            }
        },
        methods: {
            submit: function () {
                if (!this.$refs.form.validate()) {
                    return false;
                }
                this.property.corp_id = this.corpId;
                this.$store.dispatch('modifyOverlay', true);
                this.$http
                    .post('/api/add-property', this.property)
                    .then(response => {
                        this.property.start_date = "";
                        this.property.property_type = "";
                        this.property.name = "";
                        this.property.hitokoto = "";
                        this.property.good = "";
                        this.property.bad = "";
                        this.property.pet_type_set = [];
                        this.property.pet_cnt = "";
                        this.property.nearest_station = "";
                        this.property.minutes_on_foot = "";
                        this.property.address = "";
                        this.property.cost = "";
                        this.property.manage_cost = "";
                        this.property.deposit = "";
                        this.property.deposit_for_pet = "";
                        this.property.key_money = "";
                        this.property.deposit_ex = "";
                        this.property.update_cost = "";
                        this.property.insurance = "";
                        this.property.insurance_corp = "";
                        this.property.cost_memo = "";
                        this.property.deal_form = "";
                        this.property.area = "";
                        this.property.floor_plan = "";
                        this.property.floor = "";
                        this.property.age = "";
                        this.property.structure = "";
                        this.property.park = "";
                        this.property.other_condition = "";
                        this.property.move_in_date = "";
                        this.property.start_date = "";
                        this.property.images = [];
                        this.$refs.uploader.images = [];
                        this.$refs.form.resetValidation();
                        this.$store.dispatch('modifyOverlay', false);
                        this.$store.dispatch('modifySnackText', this.snackbar_text_success);
                        this.$store.dispatch('modifySnackColor', '#76c3bf');
                        this.$store.dispatch('modifySnackbar', true);
                        this.$emit('saved');
                    })
                    .catch(error => {
                        this.$store.dispatch('modifyOverlay', false);
                        this.$store.dispatch('modifySnackText', "エラーが発生しました");
                        this.$store.dispatch('modifySnackColor', 'warning');
                        this.$store.dispatch('modifySnackbar', true);
                        this.$emit('saved');
                    });
            },
            uploadImageSuccess(formData, index, fileList) {
                this.property.images = this.$refs.uploader.images;
            },
            beforeRemove(index, done, fileList) {
                done();
            },
        },
    }
</script>
