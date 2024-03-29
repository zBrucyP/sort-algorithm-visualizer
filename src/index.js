let rectangleCountSlider;
let startPauseResumeButton;
let rectangleCount = 10;
let lastSortStep = 0;
let delayMillis = 500;
let paused = true;
let rectangles = [];
let sortAlgo;

const BUBBLE_SORT_ALGORITHM = "Bubble";
const SELECTION_SORT_ALGORITHM = "Selection";
const INSERTION_SORT_ALGORITHM = "Insertion";
const QUICK_SORT_ALGORITHM = "Quicksort";
const GNOME_SORT_ALGORITHM = "Gnomesort";

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
    rectangleCountSlider = createSlider(3, 250, rectangleCount);
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

    algorithmSelectLabel = createDiv('Algorithm: ');
    algorithmSelectLabel.position(670, 10);
    algorithmSelect = createSelect();
    algorithmSelect.option(BUBBLE_SORT_ALGORITHM);
    algorithmSelect.option(SELECTION_SORT_ALGORITHM);
    algorithmSelect.option(INSERTION_SORT_ALGORITHM);
    algorithmSelect.option(QUICK_SORT_ALGORITHM);
    algorithmSelect.option(GNOME_SORT_ALGORITHM);
    algorithmSelect.style('width', '150px');
    algorithmSelect.selected(BUBBLE_SORT_ALGORITHM);
    algorithmSelect.changed(reset);
    // algorithmSelect.position(670, 10);
    algorithmSelect.parent(algorithmSelectLabel);

    reset();
}

function draw() {
    // check if simulation should reset
    if (rectangleCountSlider.value() != rectangleCount) {
        console.log("Settings changed, resetting...");
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
        } else {
            console.log('sorted!');
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

    rectangles = generateRandomRectangles(rectangleCount, rectangleCount * 3, windowHeight-(windowHeight*.3));

    sortAlgo = getSortAlgorithm(algorithmSelect.value(), rectangles);
}

function getSortAlgorithm(key, rectangles) {
    if (key == BUBBLE_SORT_ALGORITHM) {
        return new BubbleSort(rectangles);
    } else if (key == SELECTION_SORT_ALGORITHM) {
        return new SelectionSort(rectangles);
    } else if (key == INSERTION_SORT_ALGORITHM) {
        return new InsertionSort(rectangles);
    } else if (key == QUICK_SORT_ALGORITHM) {
        return new QuickSort(rectangles);
    } else if (key == GNOME_SORT_ALGORITHM) {
        return new GnomeSort(rectangles);
    }
    else {
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
