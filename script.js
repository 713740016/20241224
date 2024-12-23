const quizData = [
    {
        question: "電腦開機時，我們應該先按下哪個按鈕？",
        options: ["電腦主機的開機鍵", "鍵盤上的空白鍵", "耳機", "麥克風"],
        correct: 0
    },
    {
        question: "在電腦上，輸入文字主要使用什麼工具？",
        options: ["耳機", "鍵盤", "麥克風", "顯示器"],
        correct: 1
    },
    {
        question: "當我們在網路上搜尋資料時，應該注意什麼？",
        options: ["注意認證資料來源", "隨便相信任何網頁", "下載所有圖片", "點擊所有跳出視窗"],
        correct: 0
    },
    {
        question: "要關閉電腦，我們應該怎麼做？",
        options: ["直接按掉電源線", "按鍵盤上的任意鍵", "關閉螢幕", "使用系統的「開始」選單關機"],
        correct: 3
    },
    {
        question: "電腦的作用是什麼？",
        options: ["玩遊戲和看影片", "寫作業和查資料", "進行計算和學習", "以上皆是"],
        correct: 3
    }
];

function createQuiz() {
    const quizContainer = document.getElementById("quiz");
    
    quizData.forEach((questionData, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        
        questionDiv.innerHTML = `
            <p>${index + 1}. ${questionData.question}</p>
            <div class="options">
                ${questionData.options.map((option, i) => `
                    <div>
                        <input type="radio" name="question${index}" value="${i}" id="q${index}o${i}">
                        <label for="q${index}o${i}">${option}</label>
                    </div>
                `).join('')}
            </div>
        `;
        
        quizContainer.appendChild(questionDiv);
    });
}

function calculateScore() {
    let score = 0;
    
    quizData.forEach((questionData, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            if (parseInt(selectedOption.value) === questionData.correct) {
                score += 100 / quizData.length;
            }
        }
    });
    
    return Math.round(score);
}

function showResults(score) {
    const resultsDiv = document.getElementById("results");
    const scoreSpan = document.getElementById("score");
    const messageP = document.getElementById("message");
    
    resultsDiv.classList.remove("hide");
    scoreSpan.textContent = score;
    
    if (score === 100) {
        messageP.textContent = "太棒了~";
    } else if (score < 60) {
        messageP.textContent = "再加油！";
    } else {
        messageP.textContent = "做得不錯！";
    }
}

// 初始化測驗
document.addEventListener('DOMContentLoaded', () => {
    createQuiz();
});

// 提交按鈕事件處理
document.getElementById("submit").addEventListener("click", () => {
    const score = calculateScore();
    showResults(score);
});