<script>
        export let type = "primary";
        export let flat = false;
        export let inverse = false;
        
        

</script>

<button class={type} on:click>
    <slot></slot>
</button>

<style>
        button{
            border: 0;
            cursor: pointer;
            border-radius: 6px;
            padding: 8px 12px;
            font-weight: bold;
            box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
        }

        .primary{
            background-color:rgb(10, 62, 38);
            color: white;
        }
</style>