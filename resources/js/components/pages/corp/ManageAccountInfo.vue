<template>
    <div class="manage-account-info pa-2">
        <v-card
            class="manage-account-info__card pa-5"
            width="100%"
            height="100%"
        >
            <div class="manage-account-info__forms">
                <!--<v-form-->
                    <!--ref="form_email"-->
                <!--&gt;-->
                    <!--<v-text-field-->
                        <!--background-color="white"-->
                        <!--v-model="corp_info.new_email"-->
                        <!--outlined-->
                        <!--label="メールアドレス"-->
                        <!--placeholder="メールアドレス"-->
                        <!--class="mt-5"-->
                    <!--&gt;-->
                        <!--<template v-slot:append>-->
                            <!--<v-btn-->
                                <!--depressed-->
                                <!--tile-->
                                <!--x-large-->
                                <!--dark-->
                                <!--color="#76c3bf"-->
                                <!--class="ma-0"-->
                                <!--@click="submit_email"-->
                            <!--&gt;-->
                                <!--変更-->
                            <!--</v-btn>-->
                        <!--</template>-->
                    <!--</v-text-field>-->
                <!--</v-form>-->
                <v-form
                    ref="form_password"
                    lazy-validation
                >
                    <v-text-field
                        background-color="white"
                        v-model="corp_info.new_password"
                        :rules="rule_password"
                        outlined
                        label="パスワード"
                        placeholder="パスワード"
                        type="password"
                        class="mt-2"
                    >
                        <template v-slot:append>
                            <v-btn
                                depressed
                                tile
                                x-large
                                dark
                                color="#76c3bf"
                                class="ma-0"
                                @click="open_password_dialog"
                            >
                                変更
                            </v-btn>
                        </template>
                    </v-text-field>
                </v-form>
            </div>
            <div class="manage-account-info__text">
                企業情報（メールアドレス、会社名、住所など）を変更したい場合は直接ご連絡ください
            </div>
            <div class="manage-account-info__btn-wrap mt-5">
                <v-btn
                    x-large
                    color="#76c3bf"
                    dark
                    depressed
                    href="mailto:info@equall.jp"
                >
                    担当者へ連絡
                </v-btn>
            </div>
        </v-card>

        <v-dialog
            v-model="email_confirm"
            max-width="500"
        >
            <v-card>
                <v-card-text>
                    確認用メールを送信しました。
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        @click="email_confirm = false"
                    >
                        close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="password_confirm"
            max-width="500"
        >
            <v-card>
                <v-card-title>
                    現在のパスワードを入力してください。
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        backgroun-color="white"
                        v-model="corp_info.current_password"
                        :rules="rule_password"
                        type="password"
                        outlined
                        label="現在のパスワード"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="submit_password"
                        color="#76c3bf"
                        dark
                    >
                        パスワードの変更
                    </v-btn>
                    <v-btn
                        @click="password_confirm = false"
                    >
                        キャンセル
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<style lang="sass">
    @import "../../../../sass/common/_variable.scss"
    .manage-account-info
        &__text
            text-align: center
            margin-top: 5rem

        &__btn-wrap
            text-align: center
            margin-bottom: 5rem

        .v-input
            &__slot
                padding-right: 1px !important

            &__append-inner
                margin-top: 1px !important

                button
                    height: 54px !important


</style>

<script>
    export default {
        data() {
            return {
                corp_info: {
                    new_email: "",
                    new_password: "",
                    current_password: "",
                },
                email_confirm: false,
                password_confirm: false,
                rule_password:
                    [
                        v => !!v || 'この項目は必須です',
                        v => !v || v.length >= 8 || '8文字以上を入力してください',
                    ],
            }
        },
        methods: {
            open_email_dialog: function () {

            },
            open_password_dialog: function () {
                if (!this.$refs.form_password.validate()) {
                    return false;
                }
                this.password_confirm = true;
            },
            submit_email: function () {
                this.$store.dispatch('modifyOverlay', true);
                this.$http
                    .post('/api/modify-corp-email', this.corp_info)
                    .then(response => {
                        this.$store.dispatch('modifyOverlay', false);
                        this.$store.dispatch('modifySnackText', "メールアドレスの変更確認メールを送信しました。");
                        this.$store.dispatch('modifySnackColor', '#76c3bf');
                        this.$store.dispatch('modifySnackbar', true);
                        this.corp_info.new_email = "";
                        this.$refs.form_email.resetValidation();
                    })
                    .catch(error => {
                        this.$store.dispatch('modifyOverlay', false);
                        this.$store.dispatch('modifySnackText', "メールアドレスの更新に失敗しました。");
                        this.$store.dispatch('modifySnackColor', 'warning');
                        this.$store.dispatch('modifySnackbar', true);
                    });
            },
            submit_password: function () {
                this.$store.dispatch('modifyOverlay', true);
                this.$http
                    .post('/api/modify-corp-password', this.corp_info)
                    .then(response => {
                        if (response.data['status'] === "current_pass_validate_error") {
                            this.$store.dispatch('modifyOverlay', false);
                            this.$store.dispatch('modifySnackText', "現在のパスワードが違います");
                            this.$store.dispatch('modifySnackColor', 'warning');
                            this.$store.dispatch('modifySnackbar', true);
                        } else {
                            this.$store.dispatch('modifyOverlay', false);
                            this.$store.dispatch('modifySnackText', "パスワードを変更しました。");
                            this.$store.dispatch('modifySnackColor', '#76c3bf');
                            this.$store.dispatch('modifySnackbar', true);
                            this.password_confirm = false;
                            this.corp_info.current_password = "";
                            this.corp_info.new_password = "";
                            this.$refs.form_password.resetValidation();
                        }
                    })
                    .catch(error => {
                        this.$store.dispatch('modifyOverlay', false);
                        this.$store.dispatch('modifySnackText', "パスワードの更新に失敗しました。");
                        this.$store.dispatch('modifySnackColor', 'warning');
                        this.$store.dispatch('modifySnackbar', true);
                        this.$store.dispatch('modifyOverlay', false);
                    });
            },
        },
        created: {}
    }
</script>
