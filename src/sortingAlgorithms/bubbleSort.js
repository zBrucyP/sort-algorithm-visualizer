
class BubbleSort extends SortParent {
    constructor(rectanglesToSort) {
        super();
        this.rectanglesToSort = rectanglesToSort;
        this.lastI = 0;
        this.lastJ = 0;
    }

    sortStep() {
        for (let i = this.lastI; i < this.rectanglesToSort.length; i++) {
            for (let j = this.lastJ; j < this.rectanglesToSort.length - i - 1; j++) {
                if (this.rectanglesToSort[j].value > this.rectanglesToSort[j + 1].value) {
                    // swap
                    const tempRectangle = this.rectanglesToSort[j];
                    this.rectanglesToSort[j] = this.rectanglesToSort[j + 1];
                    this.rectanglesToSort[j + 1] = tempRectangle;

                    // record where we stopped and return
                    this.lastI = i;
                    this.lastJ = j;
                    return this.rectanglesToSort;
                }
            }
            this.lastI = i;
            this.lastJ = 0;
            return this.rectanglesToSort;
        }
        return this.rectanglesToSort;
    }
}