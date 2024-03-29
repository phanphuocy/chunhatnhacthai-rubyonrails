console.log("this page loads");

window.addEventListener("load", function() { // this line is difference from tutorial
    
    var Avatar = {
        previewAvatar() {
            if (window.File && window.FileList && window.FileReader) {
                function handleFileSelect(event) {
                    event.stopPropagation();
                    event.preventDefault();

                    console.log(event.dataTransfer);

                    let files = event.target.files || event.dataTransfer.files; 
					// files is a FileList of File objects. List some properties.
					for (var i = 0, f; f = files[i]; i++) {
                        console.log('f: ', f);

						// Only process image files.
						if (!f.type.match('image.*')) {
							continue;
						}
						const reader = new FileReader();

						// Closure to capture the file information.
						reader.onload = (function(theFile) {
							return function(e) {
								// Render thumbnail.
								let span = document.createElement('span');
								span.innerHTML = ['<img class="thumb" src="', event.target.result,
									'" title="', escape(theFile.name), '"/>'
								].join('');
								document.getElementById('list').insertBefore(span, null);
							};
						})(f);

						// Read in the image file as a data URL.
						reader.readAsDataURL(f);
					}
                }

                function handleDragOver(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "copy";
                }

                const dropZone = document.getElementById("drop_zone");
                const target = document.documentElement;
                const fileInput = document.getElementById("user_user_avatar");
                const previewImage = document.getElementById("previewImage");
                const editUserForm = document.getElementById("edit_user");

                if (dropZone) {
                    dropZone.addEventListener('dragover', handleDragOver, false);
                    dropZone.addEventListener('drop', handleFileSelect, false);

                    dropZone.addEventListener('dragover', (e) => {
                        dropZone.classList.add('fire');
                    })
    
                    dropZone.addEventListener('dragleave', (e) => {
                        dropZone.classList.remove('fire');
                    })
    
                    dropZone.addEventListener('drop', (e) => {
                        e.preventDefault();
                        dropZone.classList.remove('fire');
                        fileInput.files = e.dataTransfer.files;
                        // if on /users/edit hide preview avatar on drop
                        if (previewImage) {
                            previewImage.style.display = 'none';
                        }
                        if (editUserForm) {
                            dropZone.style.display = 'none';
                        }
    
                    }, false)
                }

                target.addEventListener('dragover', (e)=>{
                    e.preventDefault();
                    dropZone.classList.add('dragging');
                }, false);

                target.addEventListener('dragleave', (e)=>{
                    // dropZone.classList.remove('dragging');
                    // dropZone.classList.remove('fire');
                })
            }
        }
    };

    Avatar.previewAvatar();
})