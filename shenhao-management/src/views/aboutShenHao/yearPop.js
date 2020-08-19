import { setDevelopmentYear } from '../../api/shenhaoApi'
import { Function } from 'core-js'

export default {
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    closePop: {
      type: Function,
      required: true
    },
    getYear: {
      type: Function,
      required: true
    }
  },
  created() {},
  watch: {
    visible(value) {
      this.form.resetFields()
    }
  },
  methods: {
    handleSubmit(e) {
      this.form.validateFields((err, values) => {
        if (!values.year) {
          return
        }
        setDevelopmentYear(values).then(res => {
          if (!res.success) {
            this.$message.error(res.message)
            return
          }
          this.closePop()
          this.$message.success(res.message)
          this.getYear()
        })
      })
    }
  },
  render() {
    const { getFieldDecorator } = this.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    }
    const formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8, offset: 4 }
    }
    const textareaRow = { minRows: 3, maxRows: 3 }
    const footer = [
      <a-button onClick={this.closePop}>取消</a-button>,
      <a-button type="primary" onClick={this.handleSubmit}>
        确定
      </a-button>
    ]

    return (
      <a-modal title={'新增'} visible={this.visible} onCancel={this.closePop} footer={footer}>
        <div style={{ paddingLeft: '50px' }}>
          <a-form form="form">
            <a-form-item label="年份:" label-col={formItemLayout.labelCol} wrapper-col={formItemLayout.wrapperCol}>
              {getFieldDecorator('year', {
                rules: [
                  {
                    required: true,
                    message: '请输入年份'
                  }
                ]
              })(<a-input allowClear={true} placeholder="请输入年份" />)}
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    )
  }
}
