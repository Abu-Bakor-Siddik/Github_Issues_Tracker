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
        issueContainer.appendChild(div);
    })
}

/* Highlight Active Buttons */
const setActiveButton = (status) =>{
    document.getElementById("btn-all").classList.remove("active");
    document.getElementById("btn-open").classList.remove("active");
    document.getElementById("btn-closed").classList.remove("active");

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