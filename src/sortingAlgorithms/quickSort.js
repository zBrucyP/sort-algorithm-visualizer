
class QuickSort extends SortParent {
    constructor(rectanglesToSort) {
        super();
        this.rectanglesToSort = rectanglesToSort;
        
        const lowStart = 0;
        const highStart = rectanglesToSort.length-1;
        let stack = new Array(highStart - lowStart + 1);
        stack.fill(0);
        let top = -1;
        stack[++top] = lowStart;
        stack[++top] = highStart;

        this.stack = stack;
        this.top = top;
    }

    sortStep() {
        while (this.top >= 0) {
            let high = this.stack[this.top--];
            let low = this.stack[this.top--];

            let p = this.partition(low, high);

            // elements on left of pivot
            if (p - 1 > low) {
                this.stack[++this.top] = low;
                this.stack[++this.top] = p-1;
            }

            // elements on right of pivot
            if (p + 1 < high) {
                this.stack[++this.top] = p + 1;
                this.stack[++this.top] = high;
            }

            return this.rectanglesToSort;
        }
        return this.rectanglesToSort;
    }

    partition(low, high) {
        let temp;
        let pivot = this.rectanglesToSort[high];

        let i = (low - 1);
        for (let j = low; j <= high - 1; j++) {
            if (this.rectanglesToSort[j].value <= pivot.value) {
                i++;

                temp = this.rectanglesToSort[i];
                this.rectanglesToSort[i] = this.rectanglesToSort[j];
                this.rectanglesToSort[j] = temp;
            }
        }

        temp = this.rectanglesToSort[i + 1];
        this.rectanglesToSort[i + 1] = this.rectanglesToSort[high];
        this.rectanglesToSort[high] = temp;

        return i + 1;
    }
}