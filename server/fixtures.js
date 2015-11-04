// Insert sources types
if(Types.find().count() === 0){
    Types.insert({title:"Книга"});
    Types.insert({title:"Интернет страница"});
    Types.insert({title:"Видео"});
    Types.insert({title:"Аудио"});
}