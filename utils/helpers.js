const User = require("../models/User");
const Article = require("../models/Article");
const _ = require("lodash");

function checkIfFavorited(obj, list) {
  if (_.find(list, { _id: obj._id })) {
    return true;
  }
  return false;
}

async function identifyFavoriteArticles(currUser, articles) {
  if (currUser) {
    const user = await User.findById(currUser._id);
    return articles.map((article) => {
      return {
        ...article,
        isFavorite: !checkIfFavorited(article, user.favorites),
      };
    });
  }
  return articles;
}

function getYearFilter(years) {
  const yearsFilter = years.map((year) => {
    const startDate = new Date(`${year || 1900}-01-01`);
    const endDate = new Date(`${year || 9999}-12-31`);
    return {
      publicationDate: {
        $gte: startDate,
        $lte: endDate,
      },
    };
  });
  return yearsFilter;
}

function aggregateArticles(q, yearsFilter, status = "approved", filter) {
  return Article.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [
              { title: { $regex: new RegExp(q, "i") } },
              { keywords: { $regex: new RegExp(q, "i") } },
            ],
          },
          { $or: [...yearsFilter] },
          { status },
          filter ? { _id: { ...filter } } : {},
        ],
      },
    },
  ]);
}

async function getArticles({
  q = "",
  years = [undefined],
  page = 1,
  status = "approved",
  filter = undefined,
  limit = 5,
}) {
  const yearsFilter = getYearFilter(years);

  const articlesAggregate = aggregateArticles(q, yearsFilter, status, filter);

  const { docs, totalPages } = await Article.aggregatePaginate(
    articlesAggregate,
    {
      limit: limit,
      page: page || 1,
    }
  );

  return { docs, totalPages };
}

async function listYears() {
  const distinctYears = await Article.distinct("publicationDate", {
    status: "approved",
  });

  return distinctYears.map((year) => year.getFullYear()).sort((a, b) => b - a);
}

//new (for genres/tags)
async function listKeywords() {
  const distinctKeys = await Article.distinct("keywords", {
    status: "approved",
  });

  return distinctKeys.sort(); //alphabetical
}

function aggregateUser(q, ids, filterType) {
  return User.aggregate([
    {
      $match: {
        $and: [
          ids.length > 0 ? { _id: { [filterType]: ids } } : {},
          { role: "user" },
          {
            $or: [
              { firstName: { $regex: new RegExp(q, "i") } },
              { lastName: { $regex: new RegExp(q, "i") } },
            ],
          },
        ],
      },
    },
  ]);
}

async function getPaginatedUsers(q, ids, page, filterType = "$nin") {
  const usersAggregate = aggregateUser(q, ids, filterType);

  const { docs, totalPages } = await User.aggregatePaginate(usersAggregate, {
    limit: 5,
    page: page || 1,
  });

  return { users: docs, totalPages };
}

function voteArticle(method, article, user, id) {
  const voteMethod = method + "s";
  const isVoted = user[voteMethod].includes(id);

  const isUpvoted = user.upvotes.includes(id);
  const isDownVoted = user.downvotes.includes(id);

  if (isUpvoted && method === "downvote") {
    article.upvotes -= 1;
    user.upvotes = user.upvotes.filter((articleId) => articleId != id);
  } else if (isDownVoted && method === "upvote") {
    article.downvotes -= 1;
    user.downvotes = user.downvotes.filter((articleId) => articleId != id);
  }

  article[voteMethod] += isVoted ? -1 : 1;
  if (isVoted) {
    user[voteMethod] = user[voteMethod].filter((articleId) => articleId != id);
    return;
  }
  user[voteMethod].push(id);
}

module.exports = {
  checkIfFavorited,
  identifyFavoriteArticles,
  getYearFilter,
  aggregateArticles,
  aggregateUser,
  getArticles,
  listYears,
  getPaginatedUsers,
  voteArticle,
  listKeywords,
};
