<template>
    <div class="height-95 flex-container">
        <div class="d-inline-block vertical-align-top l-sidebar row-1 pl-2 dark-bg-0">
            <div class="pa-2">
                Test
            </div>
        </div>
        <div class="d-inline-block row-2 pl-2 pr-2">
            <div class="flex-container flex-col-reverse height-95">
                <div>
                    <v-divider class="mb-3"/>
                    <div>
                        <v-text-field
                                outline
                                label="Message"
                                append-icon="send"
                        ></v-text-field>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-inline-block vertical-align-top r-sidebar row-3 pr-2 dark-bg-0">
            <div class="pa-2">
                Test
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Tide"
  }
</script>

<style scoped>
    .flex-container {
        display: flex;
    }
    .flex-col-reverse {
        flex-direction: column-reverse;
    }
    .r-sidebar {
        border-left: hsla(0, 0%, 100%,.12) 1px solid;
    }
    .l-sidebar {
        border-right: hsla(0, 0%, 100%,.12) 1px solid;
    }
    .row-1 {
        flex-grow: 2;
    }
    .row-2 {
        flex-grow: 8;
    }
    .row-3 {
        flex-grow: 2;
    }
</style>