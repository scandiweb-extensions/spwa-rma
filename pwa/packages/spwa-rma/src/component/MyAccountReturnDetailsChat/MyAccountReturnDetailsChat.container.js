/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

 import PropTypes from 'prop-types';
 import React, { createRef, PureComponent } from 'react';
 import { connect } from 'react-redux';
 
 import { showNotification } from 'Store/Notification/Notification.action';
 
 import { ReturnDispatcher } from '../../store/Return';
 import MyAccountReturnDetailsChat from './MyAccountReturnDetailsChat.component';
 
 /** @namespace SpwaRma/Component/MyAccountReturnDetailsChat/Container/mapDispatchToProps */
 export const mapDispatchToProps = (dispatch) => ({
     showErrorNotification: (type, message) => dispatch(showNotification(type, message)),
     sendComment: (requestId, comment) => ReturnDispatcher.sendComment(
         requestId,
         comment
     )
 });
 
 /** @namespace SpwaRma/Component/MyAccountReturnDetailsChat/Container/MyAccountReturnDetailsChatContainer */
 export class MyAccountReturnDetailsChatContainer extends PureComponent {
     static propTypes = {
         requestId: PropTypes.string.isRequired,
         addCommentToState: PropTypes.func.isRequired,
         comments: PropTypes.array.isRequired,
         showErrorNotification: PropTypes.func.isRequired,
         sendComment: PropTypes.func.isRequired
     };
 
     state = {
         isSendDisabled: false,
         isChatLoading: false
     };
 
     __construct(props) {
         super.__construct(props);
 
         this.commentAreaRef = createRef();
     }
 
     containerProps = () => ({
         commentAreaRef: this.commentAreaRef
     });
 
     containerFunctions = () => ({
         handleTextAreaChange: this.handleTextAreaChange.bind(this),
         handleSendMessageClick: this.handleSendMessageClick.bind(this)
     });
 
     handleTextAreaChange = ({ target: { value } }) => {
         const { isSendDisabled } = this.state;
 
         if (value && isSendDisabled) {
             this.setState({ isSendDisabled: false });
         }
 
         if (!value && !isSendDisabled) {
             this.setState({ isSendDisabled: true });
         }
     };
 
     onMessageSuccess = (comment) => {
         const { addCommentToState } = this.props;
         this.commentAreaRef.current.value = '';
 
         addCommentToState(comment);
 
         this.setState(() => ({ isChatLoading: false }));
     };
 
     handleSendMessageClick = async () => {
         const { requestId, sendComment, showErrorNotification } = this.props;
         const comment = this.commentAreaRef.current.value;
 
         this.setState(() => ({ isChatLoading: true }));
 
         await sendComment(requestId, comment)
             .then(
                 /** @namespace SpwaRma/Component/MyAccountReturnDetailsChat/Container/sendComment/then */
                 ({ sendRmaComment: comment }) => this.onMessageSuccess(comment)
             )
             .catch(
                 /** @namespace SpwaRma/Component/MyAccountReturnDetailsChat/Container/sendComment/then/catch */
                 (e) => {
                     showErrorNotification('error', `Error sending message: ${e[0].debugMessage}`);
                     this.setState(() => ({ isChatLoading: false }));
                 }
             );
     };
 
     render() {
         const { isChatLoading } = this.state;
         const { comments } = this.props;
 
         return (
             <MyAccountReturnDetailsChat
               { ...this.state }
               { ...this.props }
               { ...this.containerFunctions() }
               { ...this.containerProps() }
               comments={ comments }
               isChatLoading={ isChatLoading }
             />
         );
     }
 }
 
 export default connect(null, mapDispatchToProps)(MyAccountReturnDetailsChatContainer);
 