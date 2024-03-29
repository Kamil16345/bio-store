export const FilesUpload=()=>{

    return(
    <>
    <h1>To Upload Image on mongoDB</h1>
    <div>
        <form action="/" method="POST" enctype="multipart/form-data">
            <div>
                <label for="name">Image Title</label>
                <input type="text" id="name" placeholder="Name"
                       value="" name="name" required />
            </div>
            <div>
                <label for="desc">Image Description</label>
                <textarea id="desc" name="desc" value="" rows="2"
                          placeholder="Description" required>
                </textarea>
            </div>
            <div>
                <label for="image">Upload Image</label>
                <input type="file" id="image"
                       name="image" value="" required />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
 
    <h1>Uploaded Images</h1>
    <div>
        {/* <% items.forEach(function(image) { %> */}
        <div>
            <div>
                <img src="data:image/<%=image.img.contentType%>;base64,
                     <%=image.img.data.toString('base64')%>" />
                <div>
                    {/* <h5><%= image.name %></h5> */}
        {/* <p><%= image.desc %></p> */}
                </div>
            </div>
        </div>
        {/* <% }) %> */}
    </div>
    </>
    )
}