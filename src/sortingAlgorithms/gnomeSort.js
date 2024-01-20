class GnomeSort extends SortParent {
    constructor(rectanglesToSort) {
        super();
        this.rectanglesToSort = rectanglesToSort;
        this.lastI = 0;
        this.lastJ = 1;
    }

    sortStep() {
        if (this.rectanglesToSort[this.lastI].value > this.rectanglesToSort[this.lastJ].value) {
            // swap
            const tempRectangle = this.rectanglesToSort[this.lastJ];
            this.rectanglesToSort[this.lastJ] = this.rectanglesToSort[this.lastI];
            this.rectanglesToSort[this.lastI] = tempRectangle;
            
            if (this.lastI > 0) {
                this.lastI--;
                this.lastJ--;
            }
        }
        else {
            this.lastI++;
            this.lastJ++;
        }
        
        return this.rectanglesToSort;
    }
}