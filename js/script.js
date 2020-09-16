function showSearchResult(searchText) {
    $.getJSON("/php/parse.php?text="+searchText+"&&display="+100, function(data){
        $("#searchImgWrap").remove();
        $("body").append(`<div class="uk-child-width-1-3@m" id="searchImgWrap" uk-grid uk-lightbox="animation: slide" uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 500"></div>`)
        $("#searchInput").val(searchText);
        // $("#searchImgWrap").empty();
        let textHtml = "";
        data.items.forEach(elem => {
        textHtml += `<div>
                        <a class="uk-inline" href="${elem.link}" data-caption="${elem.title}">
                            <img src="${elem.link}" alt="img">
                        </a>
                    </div>`;
        
        });
        $("#searchImgWrap").append(textHtml);
        $("#searchResultList").css({visibility:"hidden"});
    });

    
}



window.onload = function() {

    // let loading = setInterval(() => {
    //     if($("#searchImgWrap").css({visibility: "hidden"})) {
            
    //     }
    // }, 100);
    // 타자 칠때
    $("#searchInput").on("propertychange change keyup paste input", function(e) {
        console.log(e.target.value);
		let searchText = e.target.value;
		if(e.target.value == "") {
			$("#searchResultList").css({visibility:"hidden"});
		} else {
			$.getJSON("/php/parse.php?text="+searchText+"&&display="+15, function(data){
				$("#searchResultList").empty();
				if(data == false) {
					$("#searchResultList").css({visibility:"hidden"});
					return;
				} else {
                    let textHtml = "";
                    console.log(data);
                    textHtml+= `<li class="searchLi" style="font-weight:bold">${searchText}</li>`;
					data.items.forEach((elem, idx) => {
                        textHtml += `<li class="searchLi">${elem.title}</li>`;
                    });
					$("#searchResultList").append(textHtml);
					$("#searchResultList").css({visibility:"visible"});

					$(".searchLi").on("click", function(e) {
						e.preventDefault();
						showSearchResult($(e.target).text());
					});
					
				}

			});	
		}
    });

    $("#searchInput").keydown(function(key) {
        if (key.keyCode == 13) {
            $(".searchLi").eq(0).click();
        }
    });


    // search 버튼 이벤트
    // data.forEach((jsonData) => {
    //     jsonData.items.forEach(elem => {
    //     textHtml += `<div>
    //                     <a class="uk-inline" href="${elem.link}" data-caption="${elem.title}">
    //                         <img src="${elem.link}" alt="img">
    //                     </a>
    //                 </div>`;
    // });
}