//구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요
// 문제 링크 : https://codesandbox.io/s/hamsuhyeongkoding-1juca-ddibi-7widdo?file=/src/index.js:0-3354

const buttons = document.querySelectorAll(".filter-btn");
const storeItems = document.querySelectorAll(".store-item");
const sumSpan = document.getElementById("sum");
const sumTailSpan = document.getElementById("sum-tail");

let sum = 0;
[...document.querySelectorAll(".store-item-price")].forEach(
    (item) => (sum += +item.innerText)
);
sumSpan.innerText = `$${sum}`;
if (sum > 100) {
    sumTailSpan.innerText = `으로 $100를 넘습니다`;
} else {
    sumTailSpan.innerText = `으로 $100를 넘지 못합니다`;
}

buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
        sum = 0;
        const filter = e.target.dataset.filter;

        if (filter === "all") {
            //show all items
            storeItems.forEach(function (item) {
                const price = +item.querySelector(".store-item-price").innerText;
                sum += price;
                item.style.display = "block";
            });
            sumSpan.innerText = `$${sum}`;
            if (sum > 100) {
                sumTailSpan.innerText = `으로 $100를 넘습니다`;
            } else {
                sumTailSpan.innerText = `으로 $100를 넘지 못합니다`;
            }
        } else if (filter === "cakes") {
            storeItems.forEach(function (item) {
                if (item.classList.contains("cakes")) {
                    const price = +item.querySelector(".store-item-price").innerText;
                    sum += price;
                    item.style.display = "block";
                    sumSpan.innerText = `$${sum}`;
                    if (sum > 100) {
                        sumTailSpan.innerText = `으로 $100를 넘습니다`;
                    } else {
                        sumTailSpan.innerText = `으로 $100를 넘지 못합니다`;
                    }
                } else {
                    item.style.display = "none";
                }
            });
        } else if (filter === "cupcakes") {
            storeItems.forEach(function (item) {
                if (item.classList.contains("cupcakes")) {
                    const price = +item.querySelector(".store-item-price").innerText;
                    sum += price;
                    item.style.display = "block";
                    sumSpan.innerText = `$${sum}`;
                    if (sum > 100) {
                        sumTailSpan.innerText = `으로 $100를 넘습니다`;
                    } else {
                        sumTailSpan.innerText = `으로 $100를 넘지 못합니다`;
                    }
                } else {
                    item.style.display = "none";
                }
            });
        } else if (filter === "sweets") {
            storeItems.forEach(function (item) {
                if (item.classList.contains("sweets")) {
                    const price = +item.querySelector(".store-item-price").innerText;
                    sum += price;
                    item.style.display = "block";
                    sumSpan.innerText = `$${sum}`;
                    if (sum > 100) {
                        sumTailSpan.innerText = `으로 $100를 넘습니다`;
                    } else {
                        sumTailSpan.innerText = `으로 $100를 넘지 못합니다`;
                    }
                } else {
                    item.style.display = "none";
                }
            });
        } else if (filter === "doughnuts") {
            storeItems.forEach(function (item) {
                if (item.classList.contains("doughnuts")) {
                    const price = +item.querySelector(".store-item-price").innerText;
                    sum += price;
                    item.style.display = "block";
                    sumSpan.innerText = `$${sum}`;
                    if (sum > 100) {
                        sumTailSpan.innerText = `으로 $100를 넘습니다`;
                    } else {
                        sumTailSpan.innerText = `으로 $100를 넘지 못합니다`;
                    }
                } else {
                    item.style.display = "none";
                }
            });
        }
    });
});