<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * @Route("/discussions")
 */
class DiscussionController extends Controller
{
    /**
     * @Route("/", name="discussions")
     */
    public function indexAction()
    {
        $repo = $this->getDoctrine()->getManager()->getRepository('AppBundle:Discussion');
        $discussions = $repo->findBy(['host' => $this->getUser()]);

        return $this->render('discussions/index.html.twig', [
            'discussions' => $discussions
        ]);
    }

    /**
     * @Route("/delete/{id}", name="deleteDiscussion")
     */
    public function deleteDiscussionAction($id)
    {
        $repo = $this->getDoctrine()->getManager()->getRepository('AppBundle:Discussion');
        $discussion = $repo->find($id);

        $em = $this->getDoctrine()->getManager();
        $em->remove($discussion);
        $em->flush();

        $this->addFlash('notice', 'Discussion deleted');

        return $this->redirectToRoute('discussions');
    }
}