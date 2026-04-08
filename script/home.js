console.log("home.js script connecting");
/* Creating an empty array to store all the Fetching API Data */
let allIssues = [];

/* Badges color define */
const getLabelColor = (label) => {
    if (label === "bug") return "badge-error";
    if (label === "help wanted") return "badge-warning";
    if (label === "enhancement") return "badge-success";
    if (label === "documentation") return "badge-info";
    return "badge-neutral"; 
};

/* Fetching all Data */
const loadIssues = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(json => {
        allIssues = json.data;
        displayIssues(allIssues);

        allIssuesShow('all');
    });

}

/* Display Issues */
const displayIssues = (issues) =>{
    const issueContainer = document.getElementById('issue-container');
    issueContainer.innerHTML="";

    issues.forEach(issue => {
        const div = document.createElement('div');

        div.innerHTML=`
            <div class="card bg-base-100 shadow p-5 mb-4 border-t-4 
                ${issue.status === 'open' ? 'border-green-500' : 'border-purple-400'}">
                <div class="flex justify-between">
                    <span>${issue.status === 'open' ? '<i class="fa-solid fa-circle" style="color: rgb(99, 230, 190);"></i>' : '<i class="fa-solid fa-circle" style="color: rgb(177, 151, 252);"></i>'}</span>
                    <span ${issue.priority==='high'?`class="bg-red-300 px-3 rounded-xl"`: issue.priority==='low' ? `class="bg-gray-400 px-3 rounded-xl"` : `class="bg-yellow-400 px-3 rounded-xl"`} >${issue.priority}</span>
                </div>   

                <div class="mt-2">
                    <h2 class="font-semibold text-lg">${issue.title}</h2>
                    <p class="text-gray-500 mt-2">${issue.description}</p>
                </div>

                <div class="flex flex-wrap gap-2 mt-2">
                    ${issue.labels.map(label => `
                        <span class="badge badge-soft ${getLabelColor(label)} ">
                            ${label.toUpperCase()}
                        </span>
                    `).join('')}
                </div>
                <div class="divider"></div>
                <div class=" flex flex-col space-y-2 text-sm text-gray-500">
                    <span> by ${issue.author}</span>
                    <span>${issue.createdAt}</span>
                </div>
            </div>
        `;

        //To open modal when click the card
        div.querySelector('.card')
            .addEventListener('click', () => {
                 openModal(issue);
         });
        issueContainer.appendChild(div);
    })

    //To open modal when click the card
    
};

/* Open Modal */
const openModal = (issue) =>{
    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML=`
        <div class="modal-box">

            <h3 class="text-lg font-bold">${issue.title}</h3>

            <p class="text-gray-500 mt-5">
                <span class="badge ${issue.status === 'open' ? 'badge-success' : 'badge-secondary'}">
                    ${issue.status}
                </span>
                . Opened by ${issue.author !== ""? issue.author : "None" } . ${issue.updatedAt}
            </p>

            <div class="flex flex-wrap gap-2 mt-5">
                ${issue.labels.map(label => `
                    <span class="badge badge-soft ${getLabelColor(label)}">
                        ${label.toUpperCase()}
                    </span>
                `).join('')}
            </div>

            <p class="text-gray-500 mt-5">${issue.description}</p>

            <div class="bg-gray-200 p-3 mt-5 text-black flex justify-between rounded-xl">
                <div class="mb-2">
                    <p class="text-gray-500">Assignee:</p>
                    
                    <p>${issue.assignee !== "" ? issue.assignee : "Not Assigned Yet" }</p>
                </div>

                <div>
                    <p class="text-gray-500">Priority:</p>
                    <span ${issue.priority === 'high'? 'class="bg-red-300 text-black px-3 rounded-xl"': issue.priority === 'low'? 'class="bg-gray-400 text-black px-3 rounded-xl"': 'class="bg-yellow-400 text-black px-3 rounded-xl"'}>
                        ${issue.priority}
                    </span>
                </div>
            </div>

            <div class="modal-action">
                <form method="dialog">
                    <button class="btn btn-primary">Close</button>
                </form>
            </div>

        </div>
    `;

    document.getElementById("my-modal").showModal();
}

/* Remove Active button */
const removeActiveBtn = () =>{
    document.getElementById("btn-all").classList.remove("active");
    document.getElementById("btn-open").classList.remove("active");
    document.getElementById("btn-closed").classList.remove("active");
}

/* Highlight Active Buttons */
const setActiveButton = (status) =>{

    removeActiveBtn();

    if(status === 'all'){
        document.getElementById('btn-all').classList.add('active');
    }
    else if(status === 'open'){
        document.getElementById('btn-open').classList.add('active');
    }
    else {
        document.getElementById('btn-closed').classList.add('active');
    }
}

/* All Issue Show Button */
const allIssuesShow=(status)=>{
    document.getElementById("statsIssues").innerText=allIssues.length;
    setActiveButton(status);
    displayIssues(allIssues);
}

/* Open issue Show Button */
const openIssuesShow=(status)=>{
    const openIssues = allIssues.filter(issue => issue.status === 'open')
    document.getElementById("statsIssues").innerText=openIssues.length;
    setActiveButton(status);
    displayIssues(openIssues);
}

/* Closed issue Show Button */
const closedIssuesShow=(status)=>{
    const closedIssues = allIssues.filter(issue => issue.status === 'closed')
    document.getElementById("statsIssues").innerText=closedIssues.length;
    setActiveButton(status);
    displayIssues(closedIssues);
}

loadIssues();

/* Search Issues */
document.getElementById("btn-search").addEventListener('click', ()=>{
    removeActiveBtn();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    // console.log(searchValue);

    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => {
        const allWords = data.data;
        
        const filterWords = allWords.filter(issues =>
         issues.title.toLowerCase().includes(searchValue) || issues.description.toLowerCase().includes(searchValue)
        );
        document.getElementById("statsIssues").innerText=filterWords.length;
        displayIssues(filterWords);
    });
})