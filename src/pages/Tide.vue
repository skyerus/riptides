<template>
    <div class="height-95 flex-container">
        <div class="d-inline-block row-1 pl-2 pr-2">
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
        <div class="d-inline-block vertical-align-top sidebar row-2 pr-2 dark-bg-0">
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
    .sidebar {
        height: 100%;
        border-left: hsla(0, 0%, 100%,.12) 1px solid;
    }
    .row-1 {
        flex-grow: 5;
    }
    .row-2 {
        flex-grow: 1;
    }
</style>