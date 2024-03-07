document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate-array");
    const sortButton = document.getElementById("sort");
    const bubbleSortButton = document.getElementById("bubble-sort");
    const selectionSortButton = document.getElementById("selection-sort");
    const insertionSortButton = document.getElementById("insertion-sort");
    const heapSortButton = document.getElementById("heap-sort");
    const quickSortButton = document.getElementById("quick-sort");
    const visualization = document.getElementById("visualization");
    const mergeSortButton = document.getElementById("merge-sort");

    generateButton.addEventListener("click", generateArray);
    sortButton.addEventListener("click", bubbleSort);
    bubbleSortButton.addEventListener("click", bubbleSort);
    selectionSortButton.addEventListener("click", selectionSort);
    insertionSortButton.addEventListener("click", insertionSort);
    heapSortButton.addEventListener("click", heapSort);
    quickSortButton.addEventListener("click", quickSortWrapper);
    mergeSortButton.addEventListener("click", sortUsingMergeSort);
    let array = [];

    function generateArray() {
        const size = parseInt(document.getElementById("array-size").value);
        const valuesInput = document.getElementById("array-values").value;
        const valuesArray = valuesInput.split(",").map(value => parseInt(value.trim()));

        if (valuesArray.length !== size) {
            alert(`Expected ${size} values`);
            return;
        }

        array = valuesArray;

        renderArray();
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    let sortingIndex = -1;
    function renderArray() {
        visualization.innerHTML = "";
        
        const containerHeight = visualization.clientHeight; // Get the container's height
        const maxBarValue = Math.max(...array);
    
        for (let i = 0; i < array.length; i++) {
            const value = array[i];//
            const bar = document.createElement("div");
            bar.className = "bar";
            
            // Calculate the bar's height relative to the container's height
            const barHeight = (value / maxBarValue) * containerHeight * 0.8; // Adjust 0.8 factor as needed
            bar.style.height = `${barHeight}px`;
            // bar.style.backgroundColor = getRandomColor();
            bar.style.backgroundColor = sortingIndex === i ? "#000000" : "e74c3c";
            visualization.appendChild(bar);
        }
    
        const requiredHeight = maxBarValue * 3 + 20; // Adjust the height with padding
    
        if (requiredHeight > containerHeight) {
            visualization.style.height = `${requiredHeight}px`;
        }
    }
// BubbleSort algo :
    async function bubbleSort() {
        const n = array.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                sortingIndex = j;
                renderArray();
                if (array[j] > array[j + 1]) {
                    await swap(array, j, j + 1);
                    renderArray();
                }
                sortingIndex = -1;
            }
        }
    }

    async function swap(array, i, j) {
        await sleep(100); // Add a delay for visualization
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
// Selection Sort Algo :
    async function selectionSort() {
        const n = array.length;

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            sortingIndex = i; // Highlight the current bar being sorted
            renderArray();
            for (let j = i + 1; j < n; j++) {
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }
            }

            if (minIndex !== i) {
                await swap(array, i, minIndex);
                renderArray();
            }
            sortingIndex = -1;
        }
    }
// Insertion Sort Algo :
    async function insertionSort() {
        const n = array.length;

        for (let i = 1; i < n; i++) {
            const key = array[i];
            let j = i - 1;
            sortingIndex = i; // Highlight the current bar being sorted
            renderArray();
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }

            array[j + 1] = key;
            renderArray();
            await sleep(100);
            sortingIndex = -1;
        }
    }
// Heap Sort Algo :
    async function heapify(array, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && array[left] > array[largest]) {
            largest = left;
        }

        if (right < n && array[right] > array[largest]) {
            largest = right;
        }

        if (largest !== i) {
            await swap(array, i, largest);
            renderArray();
            await heapify(array, n, largest);
        }
    }

    async function heapSort() {
        const n = array.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(array, n, i);
        }

        for (let i = n - 1; i > 0; i--) {
            sortingIndex = i; // Highlight the current bar being sorted
            renderArray();
            await swap(array, 0, i);
            renderArray();
            await heapify(array, i, 0);
            sortingIndex = -1;
        }
    }
// Quick Sort Algo :
    async function partition(array, low, high) {
        const pivot = array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (array[j] <= pivot) {
                i++;
                await swap(array, i, j);
                renderArray();
            }
        }

        await swap(array, i + 1, high);
        renderArray();
        return i + 1;
    }

    async function quickSort(array, low, high) {
        if (low < high) {
            const pi = await partition(array, low, high);
            sortingIndex = pi; // Highlight the current bar being sorted
            renderArray();

            await quickSort(array, low, pi - 1);
            await quickSort(array, pi + 1, high);
            sortingIndex = -1;
        }
    }

    async function quickSortWrapper() {
        let n = array.length;
        await quickSort(array, 0, n - 1);
    }
// Merge Sort Algo :
    async function merge(arr, l, m, r) {
        const n1 = m - l + 1;
        const n2 = r - m;

        const L = new Array(n1);
        const R = new Array(n2);

        for (let i = 0; i < n1; i++) L[i] = arr[l + i];
        for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

        let i = 0;
        let j = 0;
        let k = l;

        while (i < n1 && j < n2) {
            sortingIndex = i; // Highlight the current bar being sorted
            renderArray();
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
            renderArray();
            await sleep(100);
            sortingIndex = -1;
        }

        while (i < n1) {
            sortingIndex = i; // Highlight the current bar being sorted
            renderArray();
            arr[k] = L[i];
            i++;
            k++;
            renderArray();
            await sleep(100);
            sortingIndex = -1;
        }
        
        while (j < n2) {
            sortingIndex = j; // Highlight the current bar being sorted
            renderArray();
            arr[k] = R[j];
            j++;
            k++;
            renderArray();
            await sleep(100);
            sortingIndex = -1;
        }
    }

    async function mergeSort(arr, l, r) {
        if (l < r) {
            const m = Math.floor((l + r) / 2);
            await mergeSort(arr, l, m);
            await mergeSort(arr, m + 1, r);
            await merge(arr, l, m, r);
        }
    }

    async function sortUsingMergeSort() {
        const n = array.length;
        await mergeSort(array, 0, n - 1);
        renderArray();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
});