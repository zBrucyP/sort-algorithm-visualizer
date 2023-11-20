// import Rectangle from './rectangle';

let rectangleCountSlider;
let startPauseResumeButton;
let rectangleCount = 10;
let lastSortStep = 0;
let delayMillis = 500;
let paused = true;
let rectangles = [];
let sortAlgo;

const BUBBLE_SORT_ALGORITHM = "Bubble";
const OTHER_ALGORITHM = "x";

// sorting_algorithms = {
//     BUBBLE_SORT_ALGORITHM: BubbleSort
// }

function setup() {
    createCanvas(windowWidth, windowHeight);
    // uncomment to see canvas
    // background(153);
    // line(0, 0, width, height);

    rectangleCountSliderLabel = createDiv('Rectangle Count');
    rectangleCountSliderLabel.position(10, 10);
    rectangleCountSlider = createSlider(3, 100, rectangleCount);
    rectangleCountSlider.style('width', '100px');
    rectangleCountSlider.parent(rectangleCountSliderLabel);

    speedSliderLabel = createDiv('Speed');
    speedSliderLabel.position(250,10);
    speedSlider = createSlider(10, 5000, delayMillis);
    speedSlider.style('width', '100px');
    speedSlider.parent(speedSliderLabel);

    startPauseResumeButton = createButton('Start');
    startPauseResumeButton.position(430, 10);
    startPauseResumeButton.style('width', '100px');
    startPauseResumeButton.mousePressed(toggleStartPauseResumeButton);

    resetButton = createButton('Reset');
    resetButton.position(550,10);
    resetButton.style('width', '100px');
    resetButton.mousePressed(reset);

    algorithmRadio = createRadio();
    algorithmRadio.option(BUBBLE_SORT_ALGORITHM);
    algorithmRadio.option(OTHER_ALGORITHM);
    algorithmRadio.style('width', '600px');
    algorithmRadio.selected(BUBBLE_SORT_ALGORITHM);
    algorithmRadio.position(670, 10);

    reset();
}

function draw() {
    // check if simulation should reset
    if (rectangleCountSlider.value() != rectangleCount) {
        reset();
        return;
    }
    delayMillis = speedSlider.value();

    if (!paused) {
        // guard to check if its time to continue sorting
        if (millis() - lastSortStep < delayMillis) return;
        lastSortStep = millis();

        // do a step of sorting
        if (!isSorted(rectangles)) {
            rectangles = sortAlgo.sortStep();
        }
        
        // clear UI and redraw rectangles
        clear();
        gap = 5;
        adjustedRectWidth = (windowWidth / rectangles.length) - gap; 
        // original: (windowWidth / rectangles.length) - (gap * (rectangleCount - 1));
        for (i = 0; i < rectangles.length; i++) {
            // console.log(`i: ${i}, x: ${(adjustedRectWidth+gap)*i}, w: ${adjustedRectWidth}, h: ${rectangles[i].height}`);
            rect((adjustedRectWidth + gap) * i, 100, adjustedRectWidth, rectangles[i].height);
        }
    }
}

function reset() {
    console.log('Resetting...');
    clear();
    rectangleCount = rectangleCountSlider.value();
    startPauseResumeButton.html("Start");
    paused = true;

    console.log(`${rectangleCount} ${rectangleCountSlider.value()}`);

    rectangles = generateRandomRectangles(rectangleCount, rectangleCount * 3, windowHeight-(windowHeight*.3));

    console.log(`${rectangles.length}`);

    sortAlgo = getSortAlgorithm(algorithmRadio.value(), rectangles);
}

function getSortAlgorithm(key, rectangles) {
    if (key == BUBBLE_SORT_ALGORITHM) {
        return new BubbleSort(rectangles);
    } else {
        return new SortParent();
    }
}

function toggleStartPauseResumeButton() {
    paused = !paused;
    console.log(paused);
    if (paused) {
        startPauseResumeButton.html("Resume");
    } else {
        startPauseResumeButton.html("Pause");
    }
}

function generateRandomRectangles(numberOfRectangles, maxValue, maxHeight) {
    const rects = []
    for (i = 0; i < numberOfRectangles; i++) {
        rectVal = Math.floor(Math.random() * maxValue);
        rectHeight = (rectVal / maxValue) * maxHeight;
        newRectangle = new Rectangle(rectHeight, 20, rectVal);
        rects.push(newRectangle);
    }
    return rects;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function isSorted(rectanglesToCheck) {
    let lastVal = -1;
    for (i = 0; i < rectanglesToCheck.length; i++) {
        if (rectanglesToCheck[i].value < lastVal) {
            return false;
        }
        lastVal = rectanglesToCheck[i].value;
    }
    return true;
}

class Rectangle {
    constructor(height, width, value) {
        this.height = height;
        this.width = width;
        this.value = value;
    }
}

class SortParent {
    constructor() {

    }

    sortStep() {

    }
}

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