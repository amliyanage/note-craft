export interface Note{
    noteId   ?:string
    thumbnail  ?:string | File
    noteBody  ?:string
    summery ?:string
    isFavourite ?:string
    date   ?:Date
    status  ?:string
    userName   ?:string
    title ?:string
    visibility ?:string
}