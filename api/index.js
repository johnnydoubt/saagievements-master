const express = require("express");

const PORT = 4000;

const app = express();
app.use(express.json());

let achievements = [
  {
    id: 0,
    goal: "Unlock achievement on click (POST to /api/achievement/{id}/unlock)",
    unlocked: false,
  },

  {
    id: 1,
    goal: "Create a form to add an achievement",
    unlocked: false,
  },
  {
    id: 2,
    goal: "Create new achievement (POST to /api/achievement with payload: {'goal': 'this is a new achievement'})",
    unlocked: false,
  },
  {
    id: 3,
    goal: "Surprise us ;)",
    unlocked: false,
  },
];

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api", (_, res) => {
  res.json([
    "existing routes:",
    "GET: /achievements",
    'POST: /achievement using a JSON like {{"goal": "this is a new achievement"}}',
  ]);
});

app.get("/api/achievements", (_, res) => {
  res.json(achievements);
});

app.get("/api/tree", (_, res) => {
  // TODO: Scale this up. This is for demo purposes :)
  let achievementsAsTree = [];
  achievements.forEach(function (achievement, i) {
    let currentId = JSON.stringify(i);
    let nextId = JSON.stringify(i + 1);
    let type;
    if (i === 0) {
      type = "input";
    } else if (achievements.length - 1 === i) {
      type = "output";
    }
    achievementsAsTree.push({
      id: currentId,
      data: {
        label: achievement.goal,
      },
      type,
      position: { y: 250 - Math.random() * 200, x: i * 250 },
      sourcePosition: 'right',
      targetPosition: 'left'
    });
    if (achievements.length - 1 !== i) {
      achievementsAsTree.push({
        id: currentId + "-" + nextId,
        source: currentId,
        target: nextId,
      });
    }
  });
  res.json(achievementsAsTree);
});

app.post("/api/achievement", (req, res) => {
  // check for duplicate entry from the user
  const achievementAlreadyExists = achievements.find(
    (item) => item.goal === req.body.goal
  );
  if (achievementAlreadyExists) {
    return res.sendStatus(303);
  }

  const achievement = {
    id: achievements.length,
    goal: req.body.goal,
    unlocked: false,
  };

  achievements.push(achievement);
  res.sendStatus(200);
});

app.post("/api/achievement/:id/unlock", (req, res) => {
  const achievementId = parseInt(req.params.id, 10);

  const achievement = achievements.filter((item) => item.id === achievementId);

  if (!achievement) {
    res.sendStatus(404);
    return;
  }

  achievements = achievements.map((item) => ({
    ...item,
    unlocked: item.id === achievementId ? !item.unlocked : item.unlocked,
  }));

  res.sendStatus(200);
});
