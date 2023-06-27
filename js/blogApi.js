function fetchBlogData() {
  const baseUrl = "https://techtalks.up.railway.app";

  fetch(`${baseUrl}/api/BlogPosts/portfolio?num=3`)
    .then((response) => response.json())
    .then(function (data) {
      displayBlogData(data, baseUrl);
    });
}

function displayBlogData(blogPosts, baseUrl) {
  let template = document.getElementById("blog-template");
  let blogSection = document.getElementById("blogs");

  blogPosts.forEach((blogPost) => {
    const blogPostCard = document.importNode(template.content, true);
    //format image
    let imageDiv = blogPostCard.querySelector('[data-blog="imageLink"]');
    imageDiv.setAttribute("href", `${baseUrl}/content/${blogPost.slug}`);
    imageDiv.href = `${baseUrl}/content/${blogPost.slug}`;

    let imgTag = document.createElement("img");
    imgTag.setAttribute(
      "src",
      `data:${blogPost.imageType};base64,${blogPost.imageData}`
    );
    imgTag.classList.add("blog-image");
    imageDiv.appendChild(imgTag);
    // <img src="data:image/gif;base64,xxxxxxxxxxxxx..." class="blog-image" alt="...">
    //add title
    let blogTitleDiv = blogPostCard.querySelector('[data-blog="title"]');
    blogTitleDiv.innerHTML = blogPost.title;

    let blogDate = new Date(blogPost.dateCreated); // 2009-11-10
    let month = blogDate.toLocaleString("default", { month: "long" });
    let day = blogDate.getDate();

    //add day
    let blogDayDiv = blogPostCard.querySelector('[data-blog="day"]');
    blogDayDiv.innerHTML = day;

    //add month
    let blogMonthDiv = blogPostCard.querySelector('[data-blog="month"]');

    blogMonthDiv.innerHTML = month;

    //add content
    let blogContentDiv = blogPostCard.querySelector('[data-blog="content"]');
    blogContentDiv.innerHTML = blogPost.content;

    //readmore link
    let blogLink = blogPostCard.querySelector('[data-blog="readMoreLink"]');
    blogLink.setAttribute("href", `${baseUrl}/content/${blogPost.slug}`);

    let blogPubDate = blogPostCard.querySelector('[data-blog="publishedDate"]');

    let dateToday = new Date();
    let createdDate = new Date(
      blogPost.Updated != null ? blogPost.Updated : blogPost.Created
    );
    let diffTime = Math.abs(dateToday.getTime() - createdDate.getTime());
    let lastUpdated = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (lastUpdated == 1) {
      blogPubDate.innerHTML = `Published ${lastUpdated} day ago`;
    } else {
      blogPubDate.innerHTML = `Published ${lastUpdated} days ago`;
    }

    blogSection.appendChild(blogPostCard);
  });
}

let blogposts = [
  {
    id: 0,
    title: "string",
    abstract: "string",
    content: "string",
    created: "2023-02-24",
    updated: "2023-02-24",
    slug: "string",
    isDeleted: true,
    isPublished: true,
    imageData: "string",
    imageType: "string",
    imageFile: "string",
    categoryId: 0,
  },
];
