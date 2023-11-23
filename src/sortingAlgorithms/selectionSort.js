
class SelectionSort extends SortParent {
    constructor(rectanglesToSort) {
        super();
        this.rectanglesToSort = rectanglesToSort;
        this.lastI = 0;
    }

    sortStep() {
        for (let i = this.lastI; i< this.rectanglesToSort.length-1; i++) {
            let minIndex = i;
            for (let j = i+1; j < this.rectanglesToSort.length; j++) {
                if (this.rectanglesToSort[minIndex].value > this.rectanglesToSort[j].value) {
                    minIndex = j;
                }
            }

            //swap
            const tempRectangle = this.rectanglesToSort[minIndex];
            this.rectanglesToSort[minIndex] = this.rectanglesToSort[i];
            this.rectanglesToSort[i] = tempRectangle;

            // record where we stopped and return
            this.lastI = i+1;
            return this.rectanglesToSort;
        }
        return this.rectanglesToSort;
    }
}