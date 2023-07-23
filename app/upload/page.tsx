
function Upload() {
  return (
    <div className='uploadForm'>
        <input id="title" type="text" placeholder='영상 제목' />
        <textarea id="description" placeholder='영상 설명' />
        <select name="tag" id="tag">
            <option value="math" selected>수학</option>
            <option value="math">국어</option>
            <option value="math">영어</option>
            <option value="math">물리1</option>
            <option value="math">물리2</option>
            <option value="math">화학1</option>
            <option value="math">화학2</option>
            <option value="math">생명1</option>
            <option value="math">생명2</option>
            <option value="math">지구1</option>
            <option value="math">지구2</option>
            <option value="math">정법</option>
            <option value="math">한지</option>
            <option value="math">세지</option>
            <option value="math">여지</option>
            <option value="math">여지</option>
        </select>
    </div>
  )
}

export default Upload;
