document.getElementById('campaignForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    createCampaign(title, description, startDate, endDate);
});

let campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
let votes = JSON.parse(localStorage.getItem('votes')) || {};

function createCampaign(title, description, startDate, endDate) {
    const campaign = {
        id: Date.now(),
        title,
        description,
        startDate,
        endDate,
        votes: 0
    };

    campaigns.push(campaign);
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
    displayCampaigns();
}

function displayCampaigns() {
    const campaignList = document.getElementById('campaignList');
    campaignList.innerHTML = '';

    campaigns.forEach(campaign => {
        const hasVoted = votes[campaign.id];
        const campaignElement = document.createElement('div');
        campaignElement.classList.add('campaign');
        campaignElement.innerHTML = `
            <h3>${campaign.title}</h3>
            <p>${campaign.description}</p>
            <p>Start Date: ${campaign.startDate}</p>
            <p>End Date: ${campaign.endDate}</p>
            <p>Votes: <span id="votes-${campaign.id}">${campaign.votes}</span></p>
            <button class="vote-btn" onclick="voteCampaign(${campaign.id})" ${hasVoted ? 'disabled' : ''}>${hasVoted ? 'Voted' : 'Vote'}</button>
        `;

        campaignList.appendChild(campaignElement);
    });
}

function voteCampaign(id) {
    if (votes[id]) {
        alert("You have already voted for this campaign.");
        return;
    }

    const campaign = campaigns.find(c => c.id === id);
    campaign.votes++;
    votes[id] = true;
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
    localStorage.setItem('votes', JSON.stringify(votes));
    document.getElementById(`votes-${id}`).innerText = campaign.votes;
    displayCampaigns(); // Re-render to update the button state
}

function searchCampaigns() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredCampaigns = campaigns.filter(campaign =>
        campaign.title.toLowerCase().includes(searchTerm) ||
        campaign.description.toLowerCase().includes(searchTerm)
    );
    displayFilteredCampaigns(filteredCampaigns);
}

function displayFilteredCampaigns(filteredCampaigns) {
    const campaignList = document.getElementById('campaignList');
    campaignList.innerHTML = '';

    filteredCampaigns.forEach(campaign => {
        const hasVoted = votes[campaign.id];
        const campaignElement = document.createElement('div');
        campaignElement.classList.add('campaign');
        campaignElement.innerHTML = `
            <h3>${campaign.title}</h3>
            <p>${campaign.description}</p>
            <p>Start Date: ${campaign.startDate}</p>
            <p>End Date: ${campaign.endDate}</p>
            <p>Votes: <span id="votes-${campaign.id}">${campaign.votes}</span></p>
            <button class="vote-btn" onclick="voteCampaign(${campaign.id})" ${hasVoted ? 'disabled' : ''}>${hasVoted ? 'Voted' : 'Vote'}</button>
        `;

        campaignList.appendChild(campaignElement);
    });
}

// Initial display
displayCampaigns();

   