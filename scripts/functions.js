// select elements with this script
/**
 *
 * @param {string} qr
 * @param {function} filter
 * @returns element
 */
const $ = (
  qr,
  filter = (result) => {
    return result;
  }
) => {
  const select = document.querySelectorAll(qr),
    result =
      select.length > 0 ? (select.length == 1 ? select[0] : select) : undefined;

  if (typeof filter == "function") return filter(result);
};

/**
 *
 * @param {[{key:string,do:function}]} queries
 * @param {[string , string]} separator
 * @returns {function}
 */

function checkUrl(queries = [{}], separator = []) {
  if (separator[0] == undefined) separator[0] = "?";
  if (separator[1] == undefined) separator[1] = "&";

  let url = location.href.split(separator[0])[1];
  if(url){
    url = [url.split(separator[1])[0]]
  }

  if (url) {
    let datas = location.href.replace("?" + url, "").split(separator[1]);
    datas.reverse();
    datas.pop();
    datas = datas.concat(url);

    if (datas[0] !== undefined) {
      queries.forEach((query) => {
        if (datas.includes(query.key)) {
          query.do("");
        } else {
          const result = datas.filter((val) => {
            if (val.startsWith(query.key + "=") || query.key === null) {
              return val;
            }
          })[0];

          if (result !== undefined) {
            query.do(result.replace(query.key + "=", ""));
          }
        }
      });
    }
  }

  return {
    then: (run) => {
      setTimeout(() => {
        run();
      }, 500);
    },
  };
}

/**
 * 
 * @param {string} message 
 * @param {string} icon 
 */
function sendMessage(message = "" , icon = "success"){
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: message,
  });
}

/**
 * 
 * @param {string} text 
 * @returns string
 */
function getTextWithoutHtml(text){
  const div = document.createElement("div");
  div.innerHTML = text;

  return div.textContent;
}