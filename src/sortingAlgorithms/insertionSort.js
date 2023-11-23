
class InsertionSort extends SortParent {
    constructor(rectanglesToSort) {
        super();
        this.rectanglesToSort = rectanglesToSort;
        this.lastI = 1;
        this.lastJ = 0;
    }

    sortStep() {
        for (let i = this.lastI; i < this.rectanglesToSort.length; i++) {
            const key = this.rectanglesToSort[i];
            let j = i-1;

            while (j >= 0 && this.rectanglesToSort[j].value > key.value) {
                this.rectanglesToSort[j+1] = this.rectanglesToSort[j];
                j = j-1;
            }
            this.rectanglesToSort[j+1] = key;
            
            this.lastI = i + 1;
            return this.rectanglesToSort;
        }
        return this.rectanglesToSort;
    }
}