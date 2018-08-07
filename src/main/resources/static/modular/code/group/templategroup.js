/**
 * 管理初始化
 */
var TemplateGroup = {
    id: "TemplateGroupTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
TemplateGroup.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: '组名称', field: 'groupName', align: 'center', valign: 'middle'},
        {title: '描述', field: 'groupDesc', align: 'center', valign: 'middle'},
        {title: '创建时间', field: 'createTime', align: 'center', valign: 'middle'},
        {title: '修改时间', field: 'updateTime', align: 'center', valign: 'middle'},
    ];
};

/**
 * 检查是否选中
 */
TemplateGroup.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length === 0) {
        Root.info("请先选中表格中的某一记录！");
        return false;
    } else {
        TemplateGroup.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加
 */
TemplateGroup.openAddTemplateGroup = function () {
    var index = layer.open({
        type: 2,
        title: '添加',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Root.ctxPath + '/templateGroup/add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看详情
 */
TemplateGroup.openTemplateGroupDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Root.ctxPath + '/templateGroup/edit/'
            + TemplateGroup.seItem.id
        });
        this.layerIndex = index;
    }
};


/**
 * 删除
 */
TemplateGroup.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Root.ctxPath + "/templateGroup/remove", function (data) {
            Root.success("删除成功!");
            TemplateGroup.table.refresh();
        }, function (data) {
            Root.error("删除失败!" + data.message + "!");
        });
        ajax.setData({"id": this.seItem.id});
        ajax.start();
    }
};

TemplateGroup.formParams = function () {
    return {};
};

/**
 * 查询列表
 */
TemplateGroup.search = function () {
    var queryData = {};
    queryData['groupName'] = $("#groupName").val();
    queryData['groupDesc'] = $("#groupDesc").val();
    TemplateGroup.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = TemplateGroup.initColumn();
    var table = new BSTable(TemplateGroup.id, "/templateGroup/list", defaultColunms);
    table.setPaginationType("server");
    table.setQueryParams(TemplateGroup.formParams());
    TemplateGroup.table = table.init();
});
