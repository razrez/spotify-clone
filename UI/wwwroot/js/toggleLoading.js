export default function toggleLoading(...fields) {
    fields.forEach(field => {
        field.classList.toggle("loading");
    })
}