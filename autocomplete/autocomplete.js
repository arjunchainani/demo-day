function autocomplete(input, data) {
    input.addEventListener('keyup', function() {
        let autocompleteVals = [];

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < input.length; j++) {
                if (data[i].charAt(j) != undefined) {
                    if (data[i].charAt(j) != input.charAt(j)) {
                        break;
                    }
                }
            }
        }
    })
}